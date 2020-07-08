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

const Button = ({ handleVotes, handleSelected, votes, value }) => (
  <div>
    {anecdotes[value]} <br />
    <br />
    <button onClick={handleVotes}>vote</button>
    <button onClick={handleSelected}>next anecdote</button>
  </div>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  // const [points, setPoints] = useState({
  //   0: 0,
  //   1: 0,
  //   2: 0,
  //   3: 0,
  //   4: 0,
  //   5: 0,
  // })
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  const setToValue = () => {
    setSelected(rngThing(anecdotes.length))
  }

  const setVotes = (value) => {
    // const copy = { ...points }
    // copy[value] += 1
    // console.log(copy)
    console.log(value)
  }

  return (
    <div>
      <Button
        handleVotes={(selected) => setVotes(selected)}
        handleSelected={setToValue}
        value={selected}
        // votes={points}
      />
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root'),
)
