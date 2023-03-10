import { useState } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newSearch, setNewSearch] = useState('') 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name.toLowerCase() === newName.toLowerCase())) {
        alert(`${newName} is already added to phonebook`)
    } else {
      const newObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newObject))
      setNewName("")
      setNewNumber("")
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
  
  const peopleToShow = newSearch === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text="filter shown with: " search={newSearch} handleSearchChange={handleSearchChange} />
      <h3>Add a New</h3>
      <Add handleSubmit={addName} name={newName} handleNameChange={handleNameChange} number={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <ul>
        {peopleToShow.map(person =>
        <Numbers key={person.name} name={person.name} number={person.number} />)}
      </ul>
    </div>
  )

}

export default App