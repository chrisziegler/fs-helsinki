import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <div>The app is used by pressing the buttons.</div>
  }
  return <p>button press history: {allClicks.join(' ')}</p>
}

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div className="App">
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
