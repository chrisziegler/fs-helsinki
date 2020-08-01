import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryView from './components/CountryView'
import Search from './components/Search'
import SearchView from './components/SearchView'

function App() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      // .get(`https://restcountries.eu/rest/v2/all`)
      // mock api data in development
      .get('http://localhost:3001/countries')
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
    <div>
      <h1>Country Data</h1>
      <Search search={search} handleSearch={handleSearch} />
      {countries.length === 1 ? (
        <CountryView countries={countries} />
      ) : countries.length <= 10 ? (
        <SearchView
          countries={countries}
          setCountries={setCountries}
          data={data}
          setSearch={setSearch}
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
