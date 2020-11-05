const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'This is funny',
    author: 'Will Smith',
    url: 'https://www.reddit.com/r/funny',
    likes: 2,
  },
  {
    title: 'This is news',
    author: 'Wolff Blitzer',
    url: 'https://www.cnn.com',
    likes: 1,
  },
]

const newBlog = {
  title: 'This is sad',
  author: 'Bozo the Clown',
  url: 'https://www.goolge.com',
  likes: 5,
}

beforeEach(async () => {
  await Blog.deleteMany()
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.header['content-type']).toContain('application/json')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs have an id', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(r => expect(r.id).toBeDefined())
})

test('POST route creates a new blog post in the db, status and header correct', async () => {
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await Blog.find({})
  expect(blogsAfter).toHaveLength(initialBlogs.length + 1)
  const titles = blogsAfter.map(b => b.title)
  expect(titles).toContain('This is sad')
})

test('blog posts missing likes default to 0 likes', async () => {
  const missingLikesBlog = {
    title: 'Something is missing',
    author: 'Elon Musk',
    url: 'https://www.tesla.com',
  }
  await api.post('/api/blogs').send(missingLikesBlog).expect(201)

  const blogsAfter = await Blog.find({})
  const json = blogsAfter.map(b => b.toJSON())
  json.map(n => expect(n.likes).toBeDefined())
})
test('blog posts missing url and title are bad request', async () => {
  const missingMostBlog = {
    url: 'https://www.unknown.com',
    likes: 0,
  }
  await api.post('/api/blogs').send(missingMostBlog).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
