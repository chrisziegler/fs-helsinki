import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default ({ capital }) => {
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=imperial&appid=${process.env.REACT_APP_OW_API_KEY}`,
      )
      .then((response) =>
        setWeatherData(response.data.main),
      )
  }, [capital])

  return (
    <div>
      <h3>weather in {capital}</h3>
      {Object.keys(weatherData).map((key, index) => {
        return (
          <div key={index}>
            <span
              style={{
                fontWeight: 'bold',
              }}
            >
              {key}:{' '}
            </span>
            <span>{weatherData[key]}</span>
          </div>
        )
      })}
    </div>
  )
}
