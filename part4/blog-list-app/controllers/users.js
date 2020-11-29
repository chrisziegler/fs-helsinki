const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    content: 1,
    date: 1,
  })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.username || body.username.length < 3) {
    return response.status(400).json({
      error:
        '400 Bad Request: username with length of at least 3 characters required',
    })
  }
  if (!body.password || body.password.length < 3) {
    return response.status(400).json({
      error:
        '400 Bad Request: password with length of at least 3 characters required',
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
