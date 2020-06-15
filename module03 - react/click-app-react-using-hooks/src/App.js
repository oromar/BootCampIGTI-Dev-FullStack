import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  const [items, setItems] = useState([])
  const handleClick = () => {
    setItems([...items, new Date().toLocaleString('pt-BR', dateOptions)])
  }
  useEffect(() => {
    document.title = items.length
  })
  return (
    <div>
      <button onClick={handleClick} type="button">
        Click Me
      </button>
      <ul>{items && items.map((item) => <li key={item}>{item} </li>)}</ul>
    </div>
  )
}

export default App
