const Part = ({ name, exercises}) => <p>{name} {exercises}</p>
  
const Total = ({ sum }) => <h3>Total of {sum} exercises</h3>
  
const Content = ({ parts }) =>
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </div>
  
const Header = ({ name }) => <h2>{name}</h2>
  
const Course = ({ name, parts }) => {
    const total = parts.map(part => part.exercises)
    return (
      <div>
        <Header name={name} />
        <Content parts={parts} />
        <Total sum={total.reduce((accumulator, currentValue) => accumulator + currentValue)} />
      </div>
    )
}

export default Course