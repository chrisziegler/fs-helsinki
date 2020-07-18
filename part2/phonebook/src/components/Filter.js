import React from 'react'

export default ({
  filterBy,
  setFilterBy,
  persons,
  setFilteredPersons,
}) => {
  const handleSearch = (e) => {
    const filteredArray = persons.filter((person) =>
      person.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase()),
    )
    setFilterBy(e.target.value)
    setFilteredPersons(filteredArray)
  }
  return (
    <div>
      filter shown with:
      <input
        type="text"
        value={filterBy}
        onChange={handleSearch}
      />
    </div>
  )
}
