import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import * as Notifications from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [form, setForm] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBloglistUser',
    )
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleBlogChange = e => {
    const value = e.target.value
    setForm({
      ...form,
      [e.target.name]: value,
    })
  }

  const addBlog = async e => {
    e.preventDefault()
    try {
      const blogObject = {
        title: form.title,
        author: form.author,
        url: form.url,
      }
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setForm({
        title: '',
        author: '',
        url: '',
      })
      setSuccessMessage(`a new blog ${returnedBlog.title} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(user),
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </div>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={form.title}
            name="title"
            onChange={handleBlogChange}
          />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input
            type="text"
            value={form.author}
            name="author"
            onChange={handleBlogChange}
          />
        </label>
      </div>
      <div>
        <label>
          URL:
          <input
            type="text"
            value={form.url}
            name="url"
            onChange={handleBlogChange}
          />
        </label>
      </div>
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notifications.Error message={errorMessage} />
      <Notifications.Success message={successMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in
            <button onClick={() => handleLogout()}>logout</button>
          </p>
          {blogForm()}
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
