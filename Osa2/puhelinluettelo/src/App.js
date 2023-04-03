import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import Contacts from './components/Contacts'
import Notification from './components/Notification'

import contactService from './services/contacts'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newSearch, setNewSearch] = useState('') 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    if (contacts.some(c => c.name.toLowerCase() === newName.toLowerCase())) {
        if (window.confirm(`${newName} is already added to phonebook. Replace the old number with new one?`)) {
          const contact = contacts.find(c => c.name === newName)
          const id = contact.id
          const changedContact = {...contact, number: newNumber}
          contactService
            .updateContact(id, changedContact)
            .then(returnedContact => {
              setContacts(contacts.map(contact => contact.name !== newName ? contact : returnedContact))
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
              setContacts(contacts.filter(c => c.id !== id))
            })
        }
    } else {
      const newObject = {
        name: newName,
        number: newNumber
      }

      contactService
        .createContact(newObject)
        .then(returnedContact => {
          setContacts(contacts.concat(returnedContact))
          setSuccessMessage(`Added ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName("")
          setNewNumber("")
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
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

  const handleDelete = (contact, id) => {
    if (window.confirm(`Delete ${contact}?`)) {
      contactService
      .deleteContact(id)
      .then(deletedContact => {
        setContacts(contacts.filter(c => c.id !== id))
      })
      setSuccessMessage(`Deleted ${contact}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }
  
  const contactsToShow = newSearch === ''
    ? contacts
    : contacts.filter(contact => contact.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <Filter text="filter shown with: " search={newSearch} handleSearchChange={handleSearchChange} />
      <h3>Add a New</h3>
      <Add handleSubmit={addContact} name={newName} handleNameChange={handleNameChange} number={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <ul>
        {contactsToShow.map(contact =>
        <Contacts key={contact.name} name={contact.name} number={contact.number} handleDelete={() => handleDelete(contact.name, contact.id)} />)}
      </ul>
    </div>
  )

}

export default App