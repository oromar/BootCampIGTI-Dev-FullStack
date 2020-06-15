import React from 'react'
import css from './counter.module.css'

class Counter extends React.Component {
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
      <div className={css.counter}>
        <button
          className={css.decButton}
          onClick={this.decrement}
          type="button"
        >
          -
        </button>
        <span>{this.state.counter}</span>
        <button
          className={css.incButton}
          onClick={this.increment}
          type="button"
        >
          +
        </button>
        <span className={css.steps}>({this.state.steps})</span>
      </div>
    )
  }
}

export default Counter
