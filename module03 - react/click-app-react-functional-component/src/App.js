import React from 'react'
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
  const list = []

  const handleClick = () => {
    list.push(new Date().toLocaleString('pt-BR', dateOptions))
    document.querySelector('ul').innerHTML = list
      .map((item) => `<li>${item}</li>`)
      .join('')
    document.title = list.length
  }

  return (
    <div>
      <button onClick={handleClick} type="button">
        Click Me
      </button>
      <ul></ul>
    </div>
  )
}

export default App
