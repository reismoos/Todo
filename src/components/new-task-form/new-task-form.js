import { useState } from 'react'
import PropTypes from 'prop-types'

const NewTaskForm = (props) => {
  const [newTodo, setNewTodo] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onInputChangeTask = (event) => {
    setNewTodo(event.target.value)
  }

  const onInputChangeMinutes = (event) => {
    if (event.target.value < 1000) {
      setMinutes(event.target.value)
    }
  }

  const onInputChangeSeconds = (event) => {
    if (event.target.value < 1000) {
      setSeconds(event.target.value)
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const timer = +minutes * 60 + +seconds
    props.addNewTask(newTodo, timer)
    setNewTodo('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        required
        onChange={(event) => onInputChangeTask(event)}
        value={newTodo}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        required
        onChange={(event) => onInputChangeMinutes(event)}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        required
        onChange={(event) => onInputChangeSeconds(event)}
      />
      <button type="submit" className="submit-btn" />
    </form>
  )
}

NewTaskForm.propTypes = {
  addNewTask: PropTypes.func.isRequired,
}

export default NewTaskForm
