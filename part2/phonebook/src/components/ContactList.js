import React from 'react'

const ContactList = ({
  filterBy,
  persons,
  filteredPersons,
  handleDelete,
}) => {
  return (
    <ul>
      {!filterBy ? (
        persons.map(person => (
          <li key={person.name}>
            {person.name} {person.number}
            <button
              className="button-sm--grey"
              onClick={() => handleDelete(person.id)}
            >
              delete
            </button>
          </li>
        ))
      ) : filterBy && filteredPersons.length > 0 ? (
        filteredPersons.map(person => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))
      ) : (
        <li>No contacts match your search</li>
      )}
    </ul>
  )
}

export default ContactList
