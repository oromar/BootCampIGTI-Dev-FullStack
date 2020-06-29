import React, { useState, useEffect } from 'react'
import './Form.css'
import Input from './Input'
import Installments from './Installments'

const Form = () => {
  const [input, setInput] = useState(100)
  const [tax, setTax] = useState(0)
  const [period, setPeriod] = useState(0)
  const [installments, setInstallments] = useState([])

  useEffect(() => {
    const list = []
    for (let i = 0; i < period; i++) {
      const newValue =
        i === 0
          ? input + (input * tax) / 100
          : list[i - 1].newValue + (list[i - 1].newValue * tax) / 100
      const diff = newValue - input
      const percent = (diff / input) * 100
      list.push({
        id: i + 1,
        newValue,
        diff,
        percent,
      })
    }
    setInstallments(list)
  }, [input, tax, period])

  const handleChange = (evt) => {
    const { name, value } = evt.target
    if (name === 'tax') setTax(+value)
    if (name === 'period' && value >= 0) setPeriod(+value)
    if (name === 'value' && value > 0) setInput(+value)
  }

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>React - Juros Compostos</h1>
      <div className="App">
        <div className="inputs-container">
          <Input
            label="Montante"
            onChange={handleChange}
            name="value"
            value={input}
            step={100}
          />
          <Input
            label="Taxa"
            onChange={handleChange}
            name="tax"
            value={tax}
            step={0.1}
          />
          <Input
            label="Período (meses)"
            onChange={handleChange}
            name="period"
            value={period}
            step={1}
          />
        </div>
      </div>
      <div class="parcels">
        {period > 0 && <Installments parcels={installments} />}
      </div>
    </>
  )
}
export default Form
