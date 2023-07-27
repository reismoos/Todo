import PropTypes from 'prop-types'

import NewTaskForm from '../new-task-form/new-task-form.js'

const Header = (props) => {
  return (
    <header className="header">
      <h1>todos</h1>
      {<NewTaskForm addNewTask={props.addNewTask} />}
    </header>
  )
}

Header.propTypes = {
  addNewTask: PropTypes.func.isRequired,
}
export default Header
