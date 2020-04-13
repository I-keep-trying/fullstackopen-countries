import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import InputWithLabel from './components/InputWithLabel'
import List from './components/List'

function App() {
  const [searchTerm, setSearchTerm] = useState('af')
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all?fields=name;alpha3Code`)
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const searchedCountriesStartsWith = countries.filter((country) => {
    return country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  })

  const searchedCountriesIncludes = countries.filter((country) => {
    return country.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const countryInfo = () => {
    const code = searchedCountriesStartsWith
      .map((cc) => cc.alpha3Code)
      .join(';')
    axios
      .get(`https://restcountries.eu/rest/v2/alpha?codes=${code}`)
      .then((response) => {
        setResults(response.data)
      })
    return results
  }

  const countryInfoIncl = () => {
    const code = searchedCountriesIncludes.map((cc) => cc.alpha3Code).join(';')
    axios
      .get(`https://restcountries.eu/rest/v2/alpha?codes=${code}`)
      .then((response) => {
        setResults(response.data)
      })
    return results
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchedCountriesStartsWith.length === 0) {
      setFlag(true)
      return
    }
    if (searchedCountriesStartsWith.length > 10) {
      alert('Too many results, please refine search criteria')
      return
    }
    countryInfo()
  }

  const handleSubmitIncl = (e) => {
    e.preventDefault()
    if (searchedCountriesIncludes.length === 0) {
      setFlag(true)
      return
    }
    if (searchedCountriesIncludes.length > 10) {
      alert('Too many results, please refine search criteria')
      return
    }
    countryInfoIncl()
  }

  const countryDetails = (item) => {
    const newResultsItem = results.filter(
      (country) => item.name === country.name
    )
    const newCountriesItem = countries.filter(
      (country) => item.name === country.name
    )
    if (results.length > 0) {
      setResults(newResultsItem)
      return
    } else {
      setResults(newCountriesItem)
      return
    }
  }

  return (
    <div>
      <h1>Countries of the World</h1>
      <div>
        <i>Search for a country to learn details</i>
      </div>

      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
        onInputSubmit={handleSubmit}
        onInputSubmit1={handleSubmitIncl}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <List
        countries={countries}
        results={results}
        flag={flag}
        onDetailClick={countryDetails}
      />
    </div>
  )
}

export default App
