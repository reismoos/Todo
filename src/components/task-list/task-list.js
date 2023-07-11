import PropTypes from 'prop-types'

import Task from '../task/task'
import EditTask from '../edit-task/edit-task'

import './task-list.css'

const TaskList = ({ tasks, onChangeStatus, onDelete, onEdit, onEditKeyDown }) => {
  const elements = tasks.map((el) => {
    const { id, edit, ...props } = el
    const clazz = edit ? 'editing' : props.status
    return (
      <li className={clazz} key={id}>
        <Task
          task={props}
          onChangeStatus={(e) => onChangeStatus(e, id)}
          onDelete={() => onDelete(id)}
          onEdit={() => onEdit(id)}
        />
        {edit ? <EditTask onEditKeyDown={onEditKeyDown} taskDeskription={props.taskDeskription} id={id} /> : null}
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      created: PropTypes.object.isRequired,
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      taskDeskription: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
}

export default TaskList
