import './task.css'

const Task = ({task, onChangeStatus, onDelete}) => {
    const {taskDeskription, created} = task;

    return (
        <div className='view' onClick={(e) => onChangeStatus(e)}>
            <input type="checkbox" className='toggle' />
            <label>
                <span className='description'>{taskDeskription}</span>
                <span className='created'>{created}</span>
            </label>
            <button className="icon icon-edit"></button>
            <button 
                className="icon icon-destroy"
                onClick={onDelete}/>
        </div>
    )
}

export default Task;