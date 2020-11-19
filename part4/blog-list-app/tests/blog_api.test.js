const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const {
  initialBlogs,
  newBlog,
  missingLikesBlog,
  blogsInDb,
  usersInDb,
  updatedBlog,
} = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany()
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})
describe('WHEN THERE ARE INITIALLY SOME BLOGS SAVED', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.header['content-type']).toContain('application/json')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blogs have an id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(r => expect(r.id).toBeDefined())
  })
})
describe('ADDING NEW BLOGS', () => {
  test('posts submitted with all required properties are successful', async () => {
    const blogsAtStart = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await blogsInDb()
    expect(blogsAfter).toHaveLength(blogsAtStart.length + 1)
    const titles = blogsAfter.map(b => b.title)
    expect(titles).toContain('This is sad')
  })

  test('blog posts missing likes default to 0 likes', async () => {
    await api.post('/api/blogs').send(missingLikesBlog).expect(201)

    const blogsAfter = await blogsInDb()
    blogsAfter.map(n => expect(n.likes).toBeDefined())
  })
  test('blog posts missing url and title are 404-bad request', async () => {
    const missingMostBlog = {
      url: 'https://www.unknown.com',
      likes: 0,
    }
    await api.post('/api/blogs').send(missingMostBlog).expect(400)
  })
})

describe('DELETING BLOGS', () => {
  test('blog posts can be deleted using correct id', async () => {
    const blogsBefore = await blogsInDb()
    const blogsBeforeLength = blogsBefore.length
    const firstBlogId = blogsBefore[0].id
    await api.delete(`/api/blogs/${firstBlogId}`).expect(204)
    const blogsAfter = await blogsInDb()
    expect(blogsAfter.length).toBe(blogsBeforeLength - 1)
  })
})

describe('UPDATING BLOG POST.', () => {
  test('blog post should update # of likes, return status-200, and retain id', async () => {
    const blogsBefore = await blogsInDb()
    const blogToViewId = blogsBefore[0].id
    const likesBefore = blogsBefore[0].likes

    await api
      .put(`/api/blogs/${blogToViewId}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAfter = await blogsInDb()
    const blogAfterId = blogsAfter[0].id
    const likesAfter = blogsAfter[0].likes
    expect(likesAfter).toBe(likesBefore + 1)
    expect(blogAfterId).toBe(blogToViewId)
  })
})

//...

describe('WHEN THERE IS INITIALLY 1 USER IN DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'chris',
      name: 'Chris Ziegler',
      password: 'dnews123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
