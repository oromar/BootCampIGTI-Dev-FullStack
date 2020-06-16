import React, { Component } from 'react'

export default class InputReadOnly extends Component {
  render() {
    const { label, value } = this.props
    return (
      <div>
        <label>{label}</label>
        <input type="text" value={value} readOnly />
      </div>
    )
  }
}
