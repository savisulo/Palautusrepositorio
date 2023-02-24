import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const DisplayAnecdote = (props) => {
  return (
    <>
    <h2>{props.text}</h2>
    <p>{props.anecdote}</p>
    <p>has {props.points} votes</p>
    </>
  )
}

const DisplayWinnerAnecdote = (props) => {
  if (props.points === 0) {
    return <p>No votes given yet.</p>
  } else {
  return (
    <>
    <p>{props.anecdote}</p>
    <p>has {props.points} votes</p>
    </>
  )
  }
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

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  
  const highestPoints = Math.max.apply(null, votes)
  const indexHighestPoints = votes.indexOf(highestPoints)
  const winnerAnecdote = anecdotes[indexHighestPoints]

  return (
    <div>
      <DisplayAnecdote anecdote={anecdotes[selected]} points={votes[selected]} text="Anecdote of the day" />
      <Button handleClick={vote} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <DisplayWinnerAnecdote anecdote={winnerAnecdote} points={highestPoints} />
    </div>
  )
}

export default App
