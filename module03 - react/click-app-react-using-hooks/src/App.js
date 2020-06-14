import React, { useState } from 'react'
import logo from './logo.svg'
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
