import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
  render() {
    const { quantity, population, onKeyUp } = this.props
    return (
      <div className="header">
        <input onKeyUp={onKeyUp} className="input-filter" type="text" />
        <span>| Quantidade de países: {quantity} &nbsp; </span>
        <span> | População total: {population}</span>
      </div>
    )
  }
}
