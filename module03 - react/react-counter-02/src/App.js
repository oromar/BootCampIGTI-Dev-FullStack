import React from 'react'
import Counter from './components/Counter'
import Counter2 from './components/Counter2'
import Band from './components/Band'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      steps: 0,
    }
  }

  decrement = () => {
    this.setState({
      counter: this.state.counter - 1,
      steps: this.state.steps + 1,
    })
  }

  increment = () => {
    this.setState({
      counter: this.state.counter + 1,
      steps: this.state.steps + 1,
    })
  }

  render() {
    return (
      <>
        <h3>Band</h3>
        <Band />
        <h3>Counter</h3>
        <Counter />
        <Counter />
        <Counter />
        <h3>Counter 2</h3>
        <Counter2
          increment={this.increment}
          decrement={this.decrement}
          counter={this.state.counter}
          steps={this.state.steps}
        />
        <Counter2
          increment={this.increment}
          decrement={this.decrement}
          counter={this.state.counter}
          steps={this.state.steps}
        />
        <Counter2
          increment={this.increment}
          decrement={this.decrement}
          counter={this.state.counter}
          steps={this.state.steps}
        />
      </>
    )
  }
}

export default App
