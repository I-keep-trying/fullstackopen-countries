import React from 'react'
import { Typography, Container } from '@material-ui/core'
import Weather from './Weather'

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
}

export default CountryDetail
