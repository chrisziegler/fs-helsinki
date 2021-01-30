const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const {
  initialBlogs,
  missingLikesBlog,
  blogsInDb,
  usersInDb,
  updatedBlog,
} = require('./test_helper')
const { deleteOne } = require('../models/blog')

let token

// runs before every test reverting to initial unauthorized users
// may want to modify so initial blogs by authorized/logged-in user
// can then test additional operations delete and update blogs w/same data
beforeEach(async () => {
  await Blog.deleteMany()
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('TESTING USERS - INITIALLY 1 USER IN DB', () => {
  test('creation succeeds with a fresh username', async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('abc123', 10)
    const user = new User({
      username: 'ChrisZ',
      name: 'Chris Ziegler',
      passwordHash,
    })
    await user.save()

    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'DangerRuss',
      name: 'Russell Wilson',
      password: 'Seahawks3',
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

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'ChrisZ',
      password: 'hunter2',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('invalid user not created when username < 3 characters', async () => {
    const usersAtStart = await usersInDb()

    await api
      .post('/api/users')
      .send({ username: 'sh', password: '12345' })
      .expect(400)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('invalid user not created when password < 3 characters', async () => {
    const usersAtStart = await usersInDb()

    await api
      .post('/api/users')
      .send({ username: 'invalidUser', password: '12' })
      .expect(400)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('login succeeds for previously registered user', async () => {
    await api
      .post('/api/login')
      .send({ username: 'ChrisZ', password: 'abc123' })
      // .expect(({ headers }) => console.log(headers))
      .then(response => {
        token = response.body.token
      })
  })
})

// tests for simple validation
describe('WHEN THERE ARE INITIALLY SOME UNAUTHORIZED TEST BLOGS SAVED', () => {
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

describe('ADDING NEW AUTHORIZED BLOGS', () => {
  test('posts by authorized logged-in users are successful', async () => {
    const blogsAtStart = await blogsInDb()

    await api
      .post('/api/login')
      .send({ username: 'ChrisZ', password: 'abc123' })
      .expect(200)
      .then(response => {
        token = response.body.token
      })

    const newBlog = {
      title: 'Authorized blog user making a post',
      author: 'ChrisZ',
      url: 'https://www.goolge.com',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await blogsInDb()
    expect(blogsAfter).toHaveLength(blogsAtStart.length + 1)
    const titles = blogsAfter.map(b => b.title)
    expect(titles).toContain('Authorized blog user making a post')
  })

  test('posts by unauthorized  users are unsuccessful', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: 'Unauthorized blog user tryinh to making a post',
      author: 'ChrisZ',
      url: 'https://www.goolge.com',
    }
    await api.post('/api/blogs').send(newBlog).expect(401)

    const blogsAfter = await blogsInDb()
    expect(blogsAfter).toHaveLength(blogsAtStart.length)
  })

  test('blog posts missing likes default to 0 likes', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(missingLikesBlog)
      .expect(201)

    const blogsAfter = await blogsInDb()
    blogsAfter.map(n => expect(n.likes).toBeDefined())
  })
  test('blog posts missing url and title are 404-bad request', async () => {
    const missingMostBlog = {
      url: 'https://www.unknown.com',
      likes: 0,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(missingMostBlog)
      .expect(400)
  })
})

describe('DELETING BLOGS', () => {
  test('blog posts can be deleted by original author', async () => {
    const blogsBefore = await blogsInDb()
    const blogsBeforeLength = blogsBefore.length
    let id
    const newBlog = {
      title: 'Delete this blog',
      author: 'ChrisZ',
      url: 'https://www.spectrum.com',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        id = response.body.id
      })
    const blogsAfter = await blogsInDb().then(blogs =>
      expect(blogs.length).toBe(blogsBeforeLength + 1),
    )
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    await blogsInDb().then(blogs =>
      expect(blogs.length).toBe(blogsBeforeLength),
    )
  })

  test('blog posts cannot be deleted by unregistered users', async () => {
    const blogsBefore = await blogsInDb()
    const blogsBeforeLength = blogsBefore.length
    const firstBlogId = blogsBefore[0].id
    await api.delete(`/api/blogs/${firstBlogId}`).expect(401)
    await blogsInDb().then(blogs =>
      expect(blogs.length).toBe(blogsBeforeLength),
    )
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

afterAll(() => {
  mongoose.connection.close()
})
