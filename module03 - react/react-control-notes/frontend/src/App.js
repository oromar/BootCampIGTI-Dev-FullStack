import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import appService, { validate } from './services/applicationService'
import './App.css'
import Header from './components/Header'
import Grades from './components/Grades'

function App() {
  const [grades, setGrades] = useState([])
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const response = await appService.get()
      const data = response.data.grades
      setGrades(data)
    }
    fetchData()
  }, [update])

  const handleUpdate = async (data) => {
    try {
      validate(data)
    } catch (err) {
      alert(err.message)
      return
    }
    await appService.put('', data)
    setUpdate(!update)
  }

  return grades.length === 0 ? (
    <span>Carregando...</span>
  ) : (
    <div className="App">
      <Header>Controle de Notas</Header>
      <Grades grades={grades} onUpdate={handleUpdate} />
    </div>
  )
}

export default App
