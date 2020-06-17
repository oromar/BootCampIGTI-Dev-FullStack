import React, { Component } from 'react'
import './Country.css'

export default function Country(props) {
  const { flag, name } = props.country
  return (
    <div className="country-card">
      <img src={flag} alt={name} />
      <span className="country-name">{name}</span>
    </div>
  )
}
