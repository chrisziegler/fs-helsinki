import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Display = ({ count }) => <div>{count}</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div className="App">
      <Display count={counter} />
      <br />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
