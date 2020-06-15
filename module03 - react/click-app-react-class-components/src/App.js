import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: [] }
    document.title = this.state.items.length
  }
  dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  componentDidUpdate = () => {
    document.title = this.state.items.length
  }

  handleClick = () => {
    this.setState({
      items: [
        ...this.state.items,
        new Date().toLocaleString('pt-BR', this.dateOptions),
      ],
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick} type="button">
          Click Me
        </button>
        <ul>
          {this.state.items &&
            this.state.items.map((item) => (
              <li key={this.state.items.indexOf(item)}> {item}</li>
            ))}
        </ul>
      </div>
    )
  }
}

export default App
