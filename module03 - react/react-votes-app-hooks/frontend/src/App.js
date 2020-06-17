import React, { useState, useEffect } from 'react'
import FlipMove from 'react-flip-move'
import './App.css'
import CardContainer from './components/CardContainer/CardContainer'
import Header from './components/Header/Header'

export default function App() {
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('http://localhost:8080/votes')
      const json = await resp.json()
      setCandidates(json.candidates)
    }
    const interval = setInterval(fetchData, 1000)
    return () => {
      clearInterval(interval)
    }
  })

  return candidates.length === 0 ? (
    <span>Carregando...</span>
  ) : (
    <>
      <Header />
      <div className="App">
        <FlipMove>
          {candidates.map((candidate, index) => (
            <div key={candidate.id}>
              <CardContainer position={index + 1} candidate={candidate} />
            </div>
          ))}
        </FlipMove>
      </div>
    </>
  )
}
