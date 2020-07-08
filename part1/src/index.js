import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (!good && !neutral && !bad) {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>good:</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral:</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad:</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all:</td>
            <td>{good + neutral + bad}</td>
          </tr>
          <tr>
            <td>average:</td>
            <td>{average ? average.toFixed(2) : 0}</td>
          </tr>
          <tr>
            <td>positive:</td>
            <td>{positive ? positive.toFixed(2) : 0}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div className="App">
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button
          handleClick={() => setNeutral(neutral + 1)}
          text="neutral"
        />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
