import NewTaskForm from '../new-task-form/new-task-form';

import './header.css'

const Header = () => {
    return (
    <header className="header">
        <h1>todos</h1>
        {<NewTaskForm />}
    </header>
    )
}

export default Header;