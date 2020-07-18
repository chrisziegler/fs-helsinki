import React, { useState } from 'react'
import ContactList from './components/ContactList'
import Filter from './components/Filter'
import NewContact from './components/NewContact'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Chris Ziegler', number: '206-321-0153' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  const addContact = (e) => {
    if (persons.find((value) => value.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      e.preventDefault()
      setNewName('')
      return
    }
    e.preventDefault()
    const newContactObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(newContactObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        persons={persons}
        setFilteredPersons={setFilteredPersons}
      />
      <NewContact
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <ContactList
        filterBy={filterBy}
        persons={persons}
        filteredPersons={filteredPersons}
      />
    </div>
  )
}

export default App
