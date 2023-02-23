import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Display = (props) => {
  return (
    <>
    <h2>{props.text}</h2>
    <p>{props.anecdote}</p>
    <p>has {props.points} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const initialVotes = Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(initialVotes)

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    setVotes(...[votes], votes[index] += 1)
  }

  const index = anecdotes.indexOf(anecdotes[selected])

  const largest = Math.max.apply(null, votes)
  const indexLargest = votes.indexOf(largest)
  const winnerAnecdote = anecdotes[indexLargest]

  return (
    <div>
      <Display anecdote={anecdotes[selected]} points={votes[index]} text="Anecdote of the day" />
      <Button handleClick={vote} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />
      <Display anecdote={winnerAnecdote} points={largest} text="Anecdote with most votes" />
    </div>
  )
}

export default App
