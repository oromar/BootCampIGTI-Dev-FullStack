import React, { Component } from 'react'
import './ProgressBar.css'

export default class ProgressBar extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {}

  render() {
    const { INSS, IRPF, salary } = this.props
    return (
      <div className="progress-bar">
        <div className="bar-container">
          <div className="bar inss" style={{ width: `${INSS}%` }}></div>
          <div className="bar irpf" style={{ width: `${IRPF}%` }}></div>
          <div className="bar salary" style={{ width: `${salary}%` }}></div>
        </div>
      </div>
    )
  }
}
