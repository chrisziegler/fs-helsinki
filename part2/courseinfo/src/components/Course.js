import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Total = ({ course }) => {
  const { parts } = course

  const sum = parts.reduce((acc, part) => {
    return acc + part.exercises
  }, 0)

  return (
    <p>
      <strong>total of {sum} exercises </strong>
    </p>
  )
}

const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  )
}

const Content = ({ course }) => {
  const { parts } = course
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  )
}
export default Course
