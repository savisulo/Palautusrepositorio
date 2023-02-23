import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all > 0) {
    return (
      <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={props.score / props.all} />
        <StatisticLine text="positive" value={(props.good / props.all) * 100 + ' %'} />
        </tbody>
      </table>
      </div>
    )
  }
  return (
    <p>No feedback given</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setScore] = useState(0)

  const pressGood = () => {
    setScore(score + 1)
    setGood(good + 1)
  }

  const pressNeutral = () => {
    setNeutral(neutral + 1)
  }

  const pressBad = () => {
    setScore(score - 1)
    setBad(bad + 1)
  }

  const all = good + neutral + bad

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={pressGood} text={'good'} />
      <Button handleClick={pressNeutral} text={'neutral'} />
      <Button handleClick={pressBad} text={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} score={score} />
    </div>
  )
}

export default App