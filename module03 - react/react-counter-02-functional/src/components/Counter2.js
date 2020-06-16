import React from 'react'
import Button from './Button'
import Value from './Value'
import Steps from './Steps'
import css from './counter.module.css'

export default function Counter2(props) {
  return (
    <div className={css.counter}>
      <Button label="-" onClick={props.decrement} className={css.decButton} />
      <Value content={props.counter} />
      <Button label="+" onClick={props.increment} className={css.incButton} />
      <Steps className={css.steps} steps={props.steps} />
    </div>
  )
}
