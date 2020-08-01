import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then((response) => setData(response.data))
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    const filtered = data.filter((item) =>
      item.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase()),
    )
    // )
    // console.log(filtered)
    setCountries(filtered)
  }

  return (
    <div className="App">
      <h1>Country Data</h1>
      <form>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </form>
      <ul>
        {countries.length === 1 ? (
          countries.map((country) => (
            <div>
              <h2>{country.name}</h2>
              {country.capital}
              <br />
              {country.population}
              <br />
              <h3>languages</h3>
              <ul>
                {country.languages.map((language) => (
                  <li key={country.name}>
                    {language.name}
                  </li>
                ))}
              </ul>
              <img
                src={country.flag}
                alt={country.name}
                width="100px"
                flag
              />
            </div>
          ))
        ) : countries.length <= 10 ? (
          countries.map((country) => (
            <li key={country.name}>{country.name}</li>
          ))
        ) : search ? (
          <span>Too many, specify another filter</span>
        ) : (
          ''
        )}
      </ul>
    </div>
  )
}

export default App
