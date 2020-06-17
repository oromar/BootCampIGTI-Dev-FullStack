import React, { useState } from 'react'
import Button from './Button'
import Value from './Value'
import Steps from './Steps'
import css from './counter.module.css'

function Counter() {

  const[counter, setCounter] = useState(0)
  const[steps, setSteps] = useState(0)

  const decrement = () => {
    setCounter(counter-1)
    setSteps(steps+1)
  }

  const increment = () => {
    setCounter(counter+1)
    setSteps(steps+1)
  }

    return (
      <div className={css.counter}>
        <Button label="-" onClick={decrement} className={css.decButton} />
        <Value content={counter} />
        <Button label="+" onClick={increment} className={css.incButton} />
        <Steps className={css.steps} steps={steps} />
      </div>
    )
  }

export default Counter
