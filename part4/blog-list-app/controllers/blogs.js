const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// JWT
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

// GET - fetch all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(blogs)
})

// POST - add new blog post
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.secret)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (!body.title && !body.author) {
    return await response.status(400).end()
  }
  const user = await User.findById(decodedToken.id)
  const blog = await new Blog({
    likes: body.likes,
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

// PUT - update blog post
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true },
  )
  response.json(updatedBlog)
})

// Async/Await DELETE route -- delete a note
blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
