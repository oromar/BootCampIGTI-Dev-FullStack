import React from 'react'
import InputReadOnly from './InputReadOnly'
import ProgressBar from './ProgressBar'
import './InputSalary.css'

class InputSalary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      salary: 1000,
    }
    this.formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    this.IRPFTableReference = [
      {
        min: 0,
        max: 1903.98,
        aliquote: 0,
        parcel: 0,
      },
      {
        min: 1903.99,
        max: 2826.65,
        aliquote: 0.075,
        parcel: 142.8,
      },
      {
        min: 2826.66,
        max: 3751.05,
        aliquote: 0.15,
        parcel: 354.8,
      },
      {
        min: 3751.06,
        max: 4664.68,
        aliquote: 0.225,
        parcel: 636.13,
      },
      {
        min: 4664.69,
        max: Number.MAX_VALUE,
        aliquote: 0.275,
        parcel: 869.36,
      },
    ]
    this.INSSTableReference = [
      {
        min: 0,
        max: 1045,
        factor: 0.075,
      },
      {
        min: 1045.01,
        max: 2089.6,
        factor: 0.09,
      },
      {
        min: 2089.61,
        max: 3134.4,
        factor: 0.12,
      },
      {
        min: 3134.4,
        max: 6101.06,
        factor: 0.14,
      },
      {
        min: 6101.06,
        max: Number.MAX_VALUE,
        factor: 713.1,
      },
    ]
  }

  handleOnChange = (evt) => {
    const { value } = evt.target
    this.setState({
      salary: +value,
    })
  }

  getINSSPercentage = () => {
    const { salary } = this.state
    return this.INSSTableReference.find(
      (range) => range.min <= salary && range.max >= salary
    ).factor
  }

  getINSSDiscount = () => {
    const { salary } = this.state
    if (
      salary > this.INSSTableReference[this.INSSTableReference.length - 1].min
    )
      return 713.1

    if (salary <= this.INSSTableReference[0].max)
      return this.getINSSPercentage() * salary

    const values = [
      +(
        this.INSSTableReference[0].factor * this.INSSTableReference[0].max
      ).toFixed(2),
    ]
    for (let i = 1; i < this.INSSTableReference.length; i++) {
      if (this.INSSTableReference[i].max < salary)
        values.push(
          +(
            (this.INSSTableReference[i].max -
              this.INSSTableReference[i - 1].max) *
            this.INSSTableReference[i].factor
          ).toFixed(2)
        )
      else {
        values.push(
          +(
            (salary - this.INSSTableReference[i - 1].max) *
            this.INSSTableReference[i].factor
          ).toFixed(2)
        )
        break
      }
    }
    return values.reduce((total, current) => total + current, 0)
  }

  getBaseIRPF = () => {
    return this.state.salary - this.getINSSDiscount()
  }

  getIRPFReference = () => {
    const baseIRPF = this.getBaseIRPF()
    return this.IRPFTableReference.find(
      (range) => range.min <= baseIRPF && range.max >= baseIRPF
    )
  }

  getIRPFDiscount = () => {
    const baseIRPF = this.getBaseIRPF()
    const IRPFReference = this.getIRPFReference()
    const result = baseIRPF * IRPFReference.aliquote - IRPFReference.parcel
    if (result > 0) return result.toFixed(2)
    return 0
  }

  render() {
    const baseINSS = this.state.salary
    const baseIRPF = this.getBaseIRPF()
    const INSSDiscount = this.getINSSDiscount()
    const INSSPercentage = ((INSSDiscount / baseINSS) * 100).toFixed(2)
    const IRPFDiscount = this.getIRPFDiscount()
    const IRPFPercentage = ((IRPFDiscount / this.state.salary) * 100).toFixed(2)
    const finalSalary = baseIRPF - this.getIRPFDiscount()
    const finalSalaryPercentage = (
      (finalSalary / this.state.salary) *
      100
    ).toFixed(2)
    return (
      <>
        <div className="container">
          <div className="input-salary">
            <label>Salário Bruto: </label>
            <input
              type="number"
              value={this.state.salary}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="readonly-inputs-container">
            <InputReadOnly
              label="Base INSS"
              value={this.formatter.format(baseINSS)}
            />
            <InputReadOnly
              label="Desconto INSS"
              value={`${this.formatter.format(
                INSSDiscount
              )} (${this.formatter.format(INSSPercentage)} %)`}
            />
            <InputReadOnly
              label="Base IRPF"
              value={this.formatter.format(baseIRPF)}
            />
            <InputReadOnly
              label="Desconto IRPF"
              value={`${this.formatter.format(IRPFDiscount)} ${
                IRPFDiscount > 0
                  ? `(${this.formatter.format(IRPFPercentage)}%)`
                  : ''
              }`}
            />
          </div>
          <div className="readonly-inputs-container">
            <InputReadOnly
              label="Salário Líquido"
              value={`${this.formatter.format(
                finalSalary
              )} (${this.formatter.format(finalSalaryPercentage)}%)`}
            />
          </div>
          <ProgressBar
            INSS={INSSPercentage}
            IRPF={IRPFPercentage}
            salary={finalSalaryPercentage}
          />
        </div>
      </>
    )
  }
}

export default InputSalary
