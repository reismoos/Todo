import { useState } from 'react'
import PropTypes from 'prop-types'

const EditTask = (props) => {
  const [newTask, setNewTask] = useState(props.taskDeskription)

  const onInputChange = (event) => {
    setNewTask(event.target.value)
  }

  return (
    <input
      type="text"
      className="edit"
      placeholder="Task"
      onChange={(event) => onInputChange(event)}
      value={newTask}
      autoFocus
      onKeyDown={(event) => props.onEditKeyDown(event, newTask, props.id)}
    />
  )
}

EditTask.propTypes = {
  addNewTask: PropTypes.func,
}

export default EditTask
