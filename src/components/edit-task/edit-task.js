import { Component } from 'react'
import PropTypes from 'prop-types'

import './edit-task.css'

export default class EditTask extends Component {
  state = {
    newTask: this.props.taskDeskription,
  }

  static propTypes = {
    addNewTask: PropTypes.func,
  }

  onInputChange = (e) => {
    this.setState({
      newTask: e.target.value,
    })
  }

  onSubmit = () => {
    console.log(this.state.newTask)
  }

  render() {
    return (
      <input
        type="text"
        className="edit"
        placeholder="Task"
        onChange={(e) => this.onInputChange(e)}
        value={this.state.newTask}
        autoFocus
        onKeyDown={(e) => this.props.onEditKeyDown(e, this.state.newTask, this.props.id)}
      />
    )
  }
}
