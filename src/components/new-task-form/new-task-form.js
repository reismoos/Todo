import { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    newTodo: '',
  }

  static propTypes = {
    addNewTask: PropTypes.func.isRequired,
  }

  onInputChange = (e) => {
    this.setState({
      newTodo: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addNewTask(this.state.newTodo)
    this.setState({
      newTodo: '',
    })
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={(e) => this.onInputChange(e)}
          value={this.state.newTodo}
        />
      </form>
    )
  }
}
