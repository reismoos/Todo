import NewTaskForm from '../new-task-form/new-task-form';

import './header.css'

const Header = (props) => {
    return (
    <header className="header">
        <h1>todos</h1>
        {<NewTaskForm addNewTask={props.addNewTask}/>}
    </header>
    )
}

export default Header;