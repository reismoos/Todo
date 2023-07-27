import { Component } from 'react'
import PropTypes from 'prop-types'

export default class EditTask extends Component {
  state = {
    newTask: this.props.taskDeskription,
  }

  static propTypes = {
    addNewTask: PropTypes.func,
  }

  onInputChange = (event) => {
    this.setState({
      newTask: event.target.value,
    })
  }

  render() {
    return (
      <input
        type="text"
        className="edit"
        placeholder="Task"
        onChange={(event) => this.onInputChange(event)}
        value={this.state.newTask}
        autoFocus
        onKeyDown={(event) => this.props.onEditKeyDown(event, this.state.newTask, this.props.id)}
      />
    )
  }
}
