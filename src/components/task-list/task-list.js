import Task from '../task/task';

import './task-list.css'

const TaskList = ({tasks}) => {

    const elements = tasks.map(el => {
        const {status, id, ...props} = el
        return (
            <li className={status} key={id}>
                <Task task={props} />
            </li>
        )
    })

    return (
        <ul className='todo-list'>
            { elements }
        </ul>
    )
}

export default TaskList;