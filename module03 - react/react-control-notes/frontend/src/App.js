import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import appService from './services/applicationService'
import './App.css'
import Header from './components/Header'
import Grades from './components/Grades'

function App() {
  const [grades, setGrades] = useState([])
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const response = await appService.get()
      const data = await response.data.grades
      setGrades(data)
    }
    fetchData()
  }, [update])

  const handleDelete = async (id) => {
    await appService.delete(`${id}`)
    setUpdate(!update)
  }

  const handleUpdate = async (data) => {
    // await appService.put(`${data.id}`, data)
  }

  return grades.length === 0 ? (
    <span>Carregando...</span>
  ) : (
    <div className="App">
      <Header>Controle de Notas</Header>
      <Grades grades={grades} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  )
}

export default App
