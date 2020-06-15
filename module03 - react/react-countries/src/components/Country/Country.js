import React, { Component } from 'react'
import './Country.css'

export default class Country extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { flag, name } = this.props.country
    return (
      <div className="country-card">
        <img src={flag} alt={name} />
        <span className="country-name">{name}</span>
      </div>
    )
  }
}
