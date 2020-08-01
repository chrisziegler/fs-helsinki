import React from 'react'

export default ({
  countries,
  setCountries,
  data,
  setSearch,
}) => {
  const handleClick = (e) => {
    const elString =
      e.target.parentElement.firstChild.textContent
    const lowerEl = elString.toLowerCase()
    setSearch(elString)
    const filtered = data.filter((country) =>
      country.name.toLowerCase().includes(lowerEl),
    )
    setCountries(filtered)
  }
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>
          {country.name}
          <button onClick={handleClick}>show</button>
        </li>
      ))}
    </ul>
  )
}
