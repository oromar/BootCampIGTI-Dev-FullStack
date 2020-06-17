import React from 'react'
import Users from './components/Users'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      showUsers: false,
    }
  }

  handleShowUsers = () => {
    this.setState({
      showUsers: !this.state.showUsers,
      users: [...this.state.users],
    })
  }

  async componentDidMount() {
    const resp = await fetch(
      'https://randomuser.me/api/?seed=rush&nat=r&results=10'
    )
    const data = await resp.json()
    this.setState({
      users: [...data.results],
    })
  }
  componentDidUpdate() {
    console.log('ComponentDidUpdate from App.js')
  }
  componentWillUnmount() {
    console.log('ComponentWillUnmount from App.js')
  }

  render() {
    const { showUsers, users } = this.state
    return (
      <div className="App">
        <label>
          <input
            onChange={this.handleShowUsers}
            checked={showUsers}
            type="checkbox"
          />
          Show
        </label>
        {showUsers && <Users users={users} />}
      </div>
    )
  }
}

export default App
