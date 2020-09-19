import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryView from './components/CountryView'
import Search from './components/Search'
import SearchView from './components/SearchView'

function App() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [countries, setCountries] = useState([])
  const [capital, setCapital] = useState('')

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      // json-server mock data for 'testing' - switch for 'production'
      // .get('http://localhost:3001/countries')
      .then(response => setData(response.data))
  }, [])

  const handleSearch = e => {
    setSearch(e.target.value)
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase()),
    )
    setCountries(filtered)
    if (countries.length === 1) {
      setCapital(countries[0].capital)
    }
  }

  return (
    <div>
      <h1>Country Data</h1>
      <Search search={search} handleSearch={handleSearch} />
      {countries.length === 1 ? (
        <CountryView countries={countries} capitalCity={capital} />
      ) : countries.length <= 10 ? (
        <SearchView
          countries={countries}
          setCountries={setCountries}
          data={data}
          setSearch={setSearch}
          setCapital={setCapital}
        />
      ) : search ? (
        <span>Too many, specify another filter</span>
      ) : (
        ''
      )}
    </div>
  )
}

export default App
