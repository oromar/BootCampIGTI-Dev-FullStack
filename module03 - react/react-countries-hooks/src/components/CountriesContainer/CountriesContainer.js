import React, { Component, useState, useEffect } from 'react'
import Country from '../Country/Country'
import Header from '../Header/Header'
import './CountriesContainer.css'

export default function CountriesContainer() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setfilteredCountries] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://restcountries.eu/rest/v2/all')
      const data = await response.json()
      const mapped = data.map(({ name, numericCode, flag, population }) => ({
        name,
        numericCode,
        filterName: name.toLowerCase(),
        flag,
        population,
      }))
      setCountries(mapped)
      setfilteredCountries(mapped)
    }
    fetchData()
  }, [])

  const getPopulation = () => {
    const value = filteredCountries.reduce(
      (total, current) => total + current.population,
      0
    )
    return value.toLocaleString('pt-BR')
  }

  const handleKeyUp = (evt) => {
    const { value } = evt.target
    const filter = value?.toLowerCase() ?? ''
    const filterMatches = countries.filter((country) =>
      country.filterName.includes(filter)
    )
    setfilteredCountries(filterMatches)
  }

  const population = getPopulation()
  return (
    <>
      <Header
        onKeyUp={handleKeyUp}
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
