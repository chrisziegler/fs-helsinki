import React from 'react'

const CountryView = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <div key={country}>
          <h2>{country.name}</h2>
          capital: {country.capital}
          <br />
          population: {country.population.toLocaleString()}
          <br />
          <h3>languages</h3>
          <ul style={{ listStyle: 'disc inside' }}>
            {country.languages.map((language) => (
              <li
                key={country.name}
                style={{ marginLeft: '1rem' }}
              >
                {language.name}
              </li>
            ))}
          </ul>
          <img
            src={country.flag}
            alt={country.name}
            width="150px"
          />
        </div>
      ))}
    </ul>
  )
}

export default CountryView
