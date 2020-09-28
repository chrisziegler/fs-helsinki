import React, { useState, useEffect } from 'react'
import ContactList from './components/ContactList'
import Filter from './components/Filter'
import NewContact from './components/NewContact'
import numberService from './services/numbers'
import Notifications from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    numberService.getAll().then(initialNumbers => {
      setPersons(initialNumbers)
    })
  }, [])

  const addContact = e => {
    if (persons.find(person => person.name === newName)) {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        e.preventDefault()
        setNewName('')
        setNewNumber('')
        return
      } else {
        const updatedPerson = persons.find(
          person => person.name === newName,
        )
        const updatedContact = {
          ...updatedPerson,
          number: newNumber,
        }
        const { id } = updatedContact
        numberService
          .update(id, updatedContact)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== id ? person : returnedPerson,
              ),
            )
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`,
            )
          })
        e.preventDefault()
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        numberService.getAll().then(initialNumbers => {
          setPersons(initialNumbers)
        })
      }
      // person doesn't exist in phonebook - create new contact
    } else {
      e.preventDefault()
      const newContactObject = {
        name: newName,
        number: newNumber,
      }
      numberService.create(newContactObject).then(returnedNumber => {
        setPersons(persons.concat(returnedNumber))
        setSuccessMessage(`Added ${returnedNumber.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deleteContact = id => {
    const { name } = persons.find(person => person.id === id)
    if (
      !window.confirm(`Do you really want to delete message id# ${id}?`)
    ) {
      return
    } else {
      // response from axios delete is just a status code - no data is sent with request
      numberService.remove(id).then(res => {
        numberService.getAll().then(updatedNumbers => {
          setPersons(updatedNumbers)
          setSuccessMessage(`Removed ${name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      })
    }
  }

  return (
    <>
      <h1 className="header-brand">
        Phoneb<span>oo</span>k
      </h1>
      <Notifications
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <Filter
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        persons={persons}
        setFilteredPersons={setFilteredPersons}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <div className="container">
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
          handleDelete={deleteContact}
        />
      </div>
    </>
  )
}

export default App
