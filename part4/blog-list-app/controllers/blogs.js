const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// GET - fetch all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(blogs)
})

// POST - add new blog post
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body.title && !body.author) {
    return await response.status(400).end()
  }
  const user = await User.findById(body.userId)
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
blogsRouter.put('/:id', async (request, response, next) => {
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
