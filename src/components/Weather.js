import React, { useState, useEffect } from 'react'
import { Typography, Container } from '@material-ui/core'
import axios from 'axios'

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

  export default Weather