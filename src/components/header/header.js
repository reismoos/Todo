import NewTaskForm from '../new-task-form/new-task-form';
import PropTypes from 'prop-types';

import './header.css'

const Header = (props) => {
    return (
    <header className="header">
        <h1>todos</h1>
        {<NewTaskForm addNewTask={props.addNewTask}/>}
    </header>
    )
}

Header.propTypes = {
    addNewTask: PropTypes.func.isRequired
}
export default Header;