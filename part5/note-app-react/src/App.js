import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import { Notification } from './components/Notification'
import './index.css'

const Footer = () => (
  <div className="footer">
    <br />
    <em>
      Note app, Department of Computer Science, University of Helsinki{' '}
      {new Date().getFullYear()}
    </em>
  </div>
)

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = event => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = {
      ...note,
      important: !note.important,
    }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}'  was already removed from server`,
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <>
      <div className="wrapper">
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <button className="toggle" onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
        <ul>
          {notesToShow.map(note => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange} />
          <button type="submit">save</button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default App
