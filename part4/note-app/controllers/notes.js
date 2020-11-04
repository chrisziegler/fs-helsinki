const notesRouter = require('express').Router()
const Note = require('../models/note')

// GET route -- fetch all notes
notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

// old Promises GET route -- fetch individual note
notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Async/Await GET route -- fetch individual note
// notesRouter.get('/:id', async (request, response, next) => {
//   try {
//     const note = await Note.findById(request.params.id)
//     if (note) {
//       response.json(note)
//     } else {
//       response.status(404).end()
//     }
//   } catch (exception) {
//     next(exception)
//   }
// })

// POST route -- add a note
notesRouter.post('/', (request, response, next) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then(savedNote => {
      response.json(savedNote.toJSON())
    })
    .catch(error => next(error))
})

// PUT route-- update note content and importance
notesRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const note = {
    content: body.content,
    important: body.important,
  }
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => response.json(updatedNote))
    .catch(error => next(error))
})

// DELETE route -- delete a note
notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
    .catch(error => next(error))
})

module.exports = notesRouter
