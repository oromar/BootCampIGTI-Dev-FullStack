import React, { useState, useEffect } from 'react'
import Users from './components/Users'
import './App.css'

function App () {
  const[users, setUsers] = useState([])
  const[showUsers, setShowUsers] = useState(false)

  const toggleShowUsers = () => {
    setShowUsers(!showUsers)
  }

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        'https://randomuser.me/api/?seed=rush&nat=r&results=10'
      )
      const data = await resp.json()
      setUsers(data.results)
    }
    fetchData()
  } , [])

    return (
      <div className="App">
        <label>
          <input
            onChange={toggleShowUsers}
            checked={showUsers}
            type="checkbox"
          />
          Show
        </label>
        {showUsers && <Users users={users} />}
      </div>
    )
}

export default App
