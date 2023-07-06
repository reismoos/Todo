import Task from '../task/task';

import './task-list.css'

const TaskList = ({tasks, onChangeStatus, onDelete}) => {

    const elements = tasks.map(el => {
        const {status, id, ...props} = el
        return (
            <li className={status} key={id}>
                <Task 
                    task={props}
                    onChangeStatus={(e) => onChangeStatus(e, id)}
                    onDelete={() => onDelete(id)} />
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