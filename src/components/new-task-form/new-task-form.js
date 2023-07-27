import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    newTodo: '',
    minutes: '',
    seconds: '',
  }

  static propTypes = {
    addNewTask: PropTypes.func.isRequired,
  }

  onInputChangeTask = (event) => {
    this.setState({
      newTodo: event.target.value,
    })
  }

  onInputChangeMinutes = (event) => {
    if (event.target.value < 1000) {
      this.setState({
        minutes: event.target.value,
      })
    }
  }

  onInputChangeSeconds = (event) => {
    if (event.target.value < 60) {
      this.setState({
        seconds: event.target.value,
      })
    }
  }

  onSubmit = (event) => {
    console.log('submit')
    event.preventDefault()
    const timer = +this.state.minutes * 60 + +this.state.seconds
    this.props.addNewTask(this.state.newTodo, timer)
    this.setState({
      newTodo: '',
      minutes: '',
      seconds: '',
    })
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          required
          onChange={(event) => this.onInputChangeTask(event)}
          value={this.state.newTodo}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.state.minutes}
          required
          onChange={(event) => this.onInputChangeMinutes(event)}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.state.seconds}
          required
          onChange={(event) => this.onInputChangeSeconds(event)}
        />
        <button type="submit" className="submit-btn" />
      </form>
    )
  }
}
