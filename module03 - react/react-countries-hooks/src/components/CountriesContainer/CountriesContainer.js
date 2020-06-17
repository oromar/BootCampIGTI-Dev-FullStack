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
    }
  }

  async componentDidMount() {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    const data = await response.json()
    const mapped = data.map(({ name, numericCode, flag, population }) => ({
      name,
      numericCode,
      filterName: name.toLowerCase(),
      flag,
      population,
    }))
    this.setState({
      countries: mapped,
      filteredCountries: mapped,
    })
  }

  getPopulation = () => {
    const value = this.state.filteredCountries.reduce(
      (total, current) => total + current.population,
      0
    )
    return value.toLocaleString('pt-BR')
  }

  handleKeyUp = (evt) => {
    const { value } = evt.target
    const filter = value?.toLowerCase() ?? ''
    const filteredCountries = this.state.countries.filter((country) =>
      country.filterName.includes(filter)
    )
    this.setState({
      filteredCountries,
    })
  }

  render() {
    const { filteredCountries } = this.state
    const population = this.getPopulation()
    return (
      <>
        <Header
          onKeyUp={this.handleKeyUp}
          quantity={filteredCountries.length}
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
