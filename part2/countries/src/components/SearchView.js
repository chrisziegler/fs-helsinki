import React from 'react'

export default ({
  countries,
  setCountries,
  data,
  setSearch,
  setCapital,
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
    setCapital(filtered[0].capital)
    // if (countries.length === 1) {
    //   setCapital(countries[0].capital)
    //   console.log(capital)
    // }
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
