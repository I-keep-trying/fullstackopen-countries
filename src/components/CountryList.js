import React from 'react'
import { Typography } from '@material-ui/core'

const CountryList = ({
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

export default CountryList
