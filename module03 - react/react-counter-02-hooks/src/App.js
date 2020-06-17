import React, { useState } from 'react'
import Counter from './components/Counter'
import Counter2 from './components/Counter2'
import Band from './components/Band'
import './App.css'

function App() {
  const [counter, setCounter] = useState(0)
  const [steps, setSteps] = useState(0)

  const decrement = () => {
    setCounter(counter-1)
    setSteps(steps+1)
  }

  const increment = () => {
    setCounter(counter+1)
    setSteps(steps+1)
  }

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
          increment={increment}
          decrement={decrement}
          counter={counter}
          steps={steps}
        />
        <Counter2
          increment={increment}
          decrement={decrement}
          counter={counter}
          steps={steps}
        />
        <Counter2
          increment={increment}
          decrement={decrement}
          counter={counter}
          steps={steps}
        />
      </>
    )
}

export default App
