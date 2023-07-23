import { Component } from 'react'
import PropTypes from 'prop-types'

/* import './new-task-form.css' */

export default class NewTaskForm extends Component {
  state = {
    newTodo: '',
    minutes: '',
    seconds: '',
  }

  static propTypes = {
    addNewTask: PropTypes.func.isRequired,
  }

  onInputChangeTask = (e) => {
    this.setState({
      newTodo: e.target.value,
    })
  }

  onInputChangeMinutes = (e) => {
    if (e.target.value < 1000) {
      this.setState({
        minutes: e.target.value,
      })
    }
  }

  onInputChangeSeconds = (e) => {
    if (e.target.value < 60) {
      this.setState({
        seconds: e.target.value,
      })
    }
  }

  onSubmit = (e) => {
    console.log('submit')
    e.preventDefault()
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
          onChange={(e) => this.onInputChangeTask(e)}
          value={this.state.newTodo}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.state.minutes}
          required
          onChange={(e) => this.onInputChangeMinutes(e)}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.state.seconds}
          required
          onChange={(e) => this.onInputChangeSeconds(e)}
        />
        <button type="submit" className="submit-btn" />
      </form>
    )
  }
}
