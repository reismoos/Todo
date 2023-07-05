import './task.css'

const Task = ({task}) => {
    const {taskDeskription, created} = task;

    return (
        <div className='view'>
            <input type="checkbox" className='toggle' />
            <label>
                <span className='description'>{taskDeskription}</span>
                <span className='created'>{created}</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"></button>
        </div>
    )
}

export default Task;