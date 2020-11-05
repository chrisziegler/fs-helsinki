const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

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

module.exports = blogsRouter
