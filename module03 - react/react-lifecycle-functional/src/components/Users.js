import React, { Component } from 'react'
import User from './User'

export default class Users extends Component {
  constructor(props) {
    super(props)
    this.interval = {}
    this.state = {
      visibleBy: 0,
    }
  }
  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ visibleBy: this.state.visibleBy + 1 }),
      1000
    )
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  componentDidUpdate() {
    console.log('ComponentDidUpdate from Users.js')
  }
  render() {
    const { users } = this.props
    const { visibleBy } = this.state
    return (
      <div>
        <h1>Usuários visíveis por {visibleBy} segundos</h1>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {users.map((user) => (
            <li key={user.id.value}>
              <User user={user} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
