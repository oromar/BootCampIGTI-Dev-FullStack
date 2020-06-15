import React, { Component } from 'react'
import Country from '../Country/Country'
import Header from '../Header/Header'
import './CountriesContainer.css'

export default class CountriesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filteredCountries: [],
      quantity: 0,
      population: '0',
    }
  }

  async componentDidMount() {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    const data = await response.json()
    const mapped = data.map(({ name, numericCode, flag, population }) => ({
      name,
      numericCode,
      flag,
      population,
    }))
    const population = mapped.reduce(
      (total, current) => total + current.population,
      0
    )
    const quantity = mapped.length
    this.setState({
      countries: mapped,
      filteredCountries: mapped,
      population: population.toLocaleString('pt-BR'),
      quantity,
    })
  }

  handleKeyUp = (evt) => {
    const { value } = evt.target
    const filteredCountries = !value
      ? this.state.countries
      : this.state.countries.filter(
          (a) => a.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
    const population = filteredCountries.reduce(
      (total, current) => total + current.population,
      0
    )
    const quantity = filteredCountries.length
    this.setState({
      filteredCountries,
      population: population.toLocaleString('pt-BR'),
      quantity,
    })
  }

  render() {
    const { filteredCountries, quantity, population } = this.state
    return (
      <>
        <Header
          onKeyUp={this.handleKeyUp}
          quantity={quantity}
          population={population}
        />
        <h1 className="title">Países</h1>
        <div className="countries-container">
          {filteredCountries &&
            filteredCountries.map((country) => (
              <Country key={country.numericCode} country={country} />
            ))}
        </div>
      </>
    )
  }
}
