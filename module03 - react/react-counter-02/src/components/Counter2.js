import React from 'react'
import Button from './Button'
import Value from './Value'
import Steps from './Steps'
import css from './counter.module.css'

class Counter2 extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={css.counter}>
        <Button
          label="-"
          onClick={this.props.decrement}
          className={css.decButton}
        />
        <Value content={this.props.counter} />
        <Button
          label="+"
          onClick={this.props.increment}
          className={css.incButton}
        />
        <Steps className={css.steps} steps={this.props.steps} />
      </div>
    )
  }
}

export default Counter2
