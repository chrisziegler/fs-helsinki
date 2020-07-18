import React from 'react'

const ContactList = ({
  filterBy,
  persons,
  filteredPersons,
}) => {
  return (
    <ul>
      {!filterBy ? (
        persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))
      ) : filterBy && filteredPersons.length > 0 ? (
        filteredPersons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))
      ) : (
        <li>No contacts match yourr search</li>
      )}
    </ul>
  )
}

export default ContactList
