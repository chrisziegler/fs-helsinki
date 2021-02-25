import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import { Notification } from './components/Notification'
import loginService from './services/login'
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const handleLogin = async event => {
    event.preventDefault()
    // parameters passed from state
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(user),
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

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

  const loginForm = () => (
    <Togglable buttonLabel="login" setErrorMessage={setErrorMessage}>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const noteForm = () => (
    <Togglable buttonLabel="new note">
      <NoteForm
        onSubmit={addNote}
        handleChange={handleNoteChange}
        value={newNote}
      />
    </Togglable>
  )
  return (
    <>
      <div className="wrapper">
        <h1>Notes</h1>
        <Notification message={errorMessage} />

        {user === null ? (
          loginForm()
        ) : (
          <div>
            <p>{user.name} logged-in</p>
            {noteForm()}
          </div>
        )}

        <button onClick={() => setShowAll(!showAll)}>
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
      </div>
      <Footer />
    </>
  )
}

export default App
