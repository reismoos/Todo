import Task from '../task/task';
import PropTypes from 'prop-types';

import './task-list.css'

const TaskList = ({tasks, onChangeStatus, onDelete}) => {

    const elements = tasks.map(el => {
        const {id, ...props} = el
        return (
            <li className={props.status} key={id}>
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

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        created: PropTypes.object.isRequired,
        id: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        taskDeskription: PropTypes.string.isRequired
    })).isRequired,
    onDelete: PropTypes.func.isRequired, 
    onChangeStatus: PropTypes.func.isRequired,
}

export default TaskList;