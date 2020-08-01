import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ContactList from './components/ContactList'
import Filter from './components/Filter'
import NewContact from './components/NewContact'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('app rendered')

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
