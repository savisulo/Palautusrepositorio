import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import Numbers from './components/Numbers'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('') 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name.toLowerCase() === newName.toLowerCase())) {
        if (window.confirm(`${newName} is already added to phonebook. Replace the old number with new one?`)) {
          const person = persons.find(p => p.name === newName)
          const id = person.id
          const changedPerson = {...person, number: newNumber}
          personService
            .updatePerson(id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
              setSuccessMessage(`Updated ${newName}`)
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
              setNewName("")
              setNewNumber("")
            })
            .catch(error => {
              setErrorMessage(
                `Information of ${newName} has already been removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.id !== id))
            })
        }
    } else {
      const newObject = {
        name: newName,
        number: newNumber
      }

      personService
        .createPerson(newObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
        })
        setSuccessMessage(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const search = event.target.value
    setNewSearch(search)
  }

  const handleDelete = (person, id) => {
    if (window.confirm(`Delete ${person}?`)) {
      personService
      .deletePerson(id)
      .then(deletedPerson => {
        setPersons(persons.filter(p => p.id !== id))
      })
      setSuccessMessage(`Deleted ${person}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }
  
  const peopleToShow = newSearch === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <Filter text="filter shown with: " search={newSearch} handleSearchChange={handleSearchChange} />
      <h3>Add a New</h3>
      <Add handleSubmit={addName} name={newName} handleNameChange={handleNameChange} number={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <ul>
        {peopleToShow.map(person =>
        <Numbers key={person.name} name={person.name} number={person.number} handleDelete={() => handleDelete(person.name, person.id)} />)}
      </ul>
    </div>
  )

}

export default App