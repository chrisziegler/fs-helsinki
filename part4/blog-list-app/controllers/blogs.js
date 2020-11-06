const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

// GET - fetch all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// POST - add new blog post
blogsRouter.post('/', async (request, response, next) => {
  if (!request.body.title && !request.body.author) {
    return await response.status(400).end()
  }
  try {
    const blog = await new Blog(request.body)
    blog.save().then(result => {
      response.status(201).json(result)
    })
  } catch (exception) {
    next(exception)
  }
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
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true },
    )
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

// Async/Await DELETE route -- delete a note
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
