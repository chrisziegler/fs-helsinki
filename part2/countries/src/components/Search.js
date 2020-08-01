import React from 'react'

export default ({ search, handleSearch }) => {
  return (
    <form>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
      />
    </form>
  )
}
