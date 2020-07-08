import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const rngThing = (max) => Math.floor(Math.random() * max)
const defaultSelected = rngThing(anecdotes.length)

const App = (props) => {
  const [selected, setSelected] = useState(defaultSelected)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  const setToValue = () => {
    setSelected(rngThing(anecdotes.length))
  }

  const setVotes = (index) => {
    const copy = [...points]
    copy[index] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes.
      <br />
      <button onClick={() => setVotes(selected)}>vote</button>
      <button onClick={setToValue}>next anecdote</button>
      <br />
      <h1>Anecdote with the most votes</h1>
      {anecdotes[points.indexOf(Math.max(...points))]}
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root'),
)
