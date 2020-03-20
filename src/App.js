import React, { useState, useEffect } from 'react'
import { Typography, Container } from '@material-ui/core'
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'

/* const CountryList = ({
  searchResult,
  randomVariable,
  searchTerm,
  selectedCountry,
}) => {
  if (
    searchTerm === undefined &&
    selectedCountry === undefined &&
    searchResult.length === 250
  ) {
    return searchResult.map(country => (
      <>
        <Typography variant="h6">
          <div key={country.alpha3Code}>
            {country.name} ::: {country.alpha3Code}{' '}
          </div>
        </Typography>
      </>
    ))
  } else {
    return searchResult.map(country => (
      <>
        <Typography variant="h6">
          <div key={country.alpha3Code}>
            {country.name} ::: {country.alpha3Code}
          </div>
          <button onClick={() => randomVariable(country)}>show</button>
        </Typography>
      </>
    ))
  }
}

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_TOKEN}&query=${capital}`
      )
      .then(response => setWeather(response.data))
  }, [])

  if (!weather) {
    return <div>No weather data available for {capital} </div>
  }

  return (
    <div>
      <Container>
        <Typography variant="h4">
          Current Weather in {capital}
          <br />
          <img
            alt={weather.current.weather_descriptions[0]}
            src={weather.current.weather_icons[0]}
          />
          <br />
        </Typography>
        <Typography variant="h6">
          <Typography paragraph>
            <strong>Temperature: </strong> {weather.current.temperature} celsius
          </Typography>
          <Typography paragraph>
            <strong>Wind</strong> {weather.current.wind_speed} kph direction{' '}
            {weather.current.wind_dir}
          </Typography>
        </Typography>
      </Container>
    </div>
  )
}

const CountryDetail = props => {
  return (
    <div>
      <Container>
        <Typography variant="h2">{props.name}</Typography>
        <Typography list>
          <ul>
            <li>Capital: {props.capital}</li>
            <li>Population: {props.population.toLocaleString()}</li>
            <li>Time Zone: {props.timezones[0]}</li>
          </ul>
        </Typography>

        <Typography variant="h4">Languages:</Typography>
        <Typography list>
          <ul>
            {props.languages.map(lang => (
              <li key={lang.iso639_1}>{lang.name}</li>
            ))}
          </ul>
        </Typography>
        <Typography variant="h4">Flag:</Typography>
        <Typography list>
          <ul>
            <li>
              <img src={props.flag} alt="Offical flag of {props.name}" />
            </li>
          </ul>
        </Typography>

        <Weather capital={props.capital} />
      </Container>
    </div>
  )
} */

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [url, setUrl] = useState(
    `https://restcountries.eu/rest/v2/all?fields=name;alpha3Code`
  )
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
    if (searchTerm === '') {
      setSearchResult(countries)
    }
  }

  useEffect(() => {
    const loadProduct = async () => {
      const response = await axios.get(url)
      setCountries(response.data)
    }

    loadProduct()
  }, [])

  useEffect(() => {
    const loadProduct = async () => {
      const response = await axios.get(url)
      setSearchResult(response.data)
    }

    loadProduct()
  }, [url])

  useEffect(() => {
    function keyListener(e) {
      if (e.key === 'Escape') {
        setSearchTerm('')
        setSelectedCountry(undefined)
        setSearchResult(countries)
        return
      }
    }
    document.addEventListener('keydown', keyListener)

    return () => document.removeEventListener('keydown', keyListener)
  }, [url])

  const handleSubmit = e => {
    e.preventDefault()

    const filter = searchResult.filter(country =>
      country.name
        .toLocaleLowerCase()
        .startsWith(searchTerm.toLocaleLowerCase().trim())
    )

    if (filter.length === 0) {
      return
    } else if (filter.length === 1) {
      const country = filter[0]
      console.log(country)
      setUrl(
        `https://restcountries.eu/rest/v2/alpha?codes=${country.alpha3Code}`
      )
      console.log(country)

      //setSearchResult(country)
      setSearchTerm('')
      return
    } else if (filter.length >= 10) {
      alert('too many results, please refine search criteria')
      return
    } else {
      const countryInfo = () => {
        const code = filter.map(cc => cc.alpha3Code).join(';')
        setUrl(`https://restcountries.eu/rest/v2/alpha?codes=${code}`)
        return
      }
      countryInfo()
      console.log(filter)
      setSearchResult(filter)

      setSearchTerm('')
    }
  }

  const handleReset = e => {
    e.preventDefault()
    setSearchTerm('')
    setSelectedCountry(undefined)
    setSearchResult(countries)
  }
  return (
    <div>
      <Container>
      <h1>Countries</h1>
      <Typography list>

      <form>
        <input
          type="search"
          placeholder="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSubmit}>search</button>
        <button onClick={handleReset}>reset</button>
      </form>
      {selectedCountry ? (
        <CountryDetail {...selectedCountry} />
      ) : (
        <CountryList
          searchResult={searchResult}
          url={url}
          randomVariable={country => setSelectedCountry(country)}
        />
      )}
            </Typography>

      </Container>
    </div>
  )
}

export default App
