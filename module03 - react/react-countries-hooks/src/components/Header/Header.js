import React, { Component } from 'react'
import './Header.css'

export default function Header(props) {
  const { quantity, population, onKeyUp } = props
  return (
    <div className="header">
      <input onKeyUp={onKeyUp} className="input-filter" type="text" />
      <span>
        | Quantidade de países:{' '}
        <span className="emphasis-value"> {quantity} </span> &nbsp;{' '}
      </span>
      <span>
        {' '}
        | População total: <span className="emphasis-value"> {population}</span>
      </span>
    </div>
  )
}
