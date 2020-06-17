import React from 'react'
import Button from './Button'
import Value from './Value'
import Steps from './Steps'
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
        <Button label="-" onClick={this.decrement} className={css.decButton} />
        <Value content={this.state.counter} />
        <Button label="+" onClick={this.increment} className={css.incButton} />
        <Steps className={css.steps} steps={this.state.steps} />
      </div>
    )
  }
}

export default Counter
