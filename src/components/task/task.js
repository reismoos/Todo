import { Component } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './task.css'
import { type } from '@testing-library/user-event/dist/type';


export default class Task extends Component {
    state = {
        timeAgo: 'less than 5 seconds ago'
    }
    
    changeTime = () => {
        const t = formatDistanceToNow(this.props.task.created, {includeSeconds: true});
        if (this.state.timeAgo !== t){
            this.setState(() => {
                
                return {
                    timeAgo: t + ' ago'
                }
            })
        }
    }

    static propTypes = {
        task: PropTypes.shape({
            taskDeskription: PropTypes.string.isRequired,
            created: PropTypes.object.isRequired,
            status: PropTypes.string.isRequired
        }).isRequired,
        onDelete: PropTypes.func.isRequired, 
        onChangeStatus: PropTypes.func.isRequired, 
    }

    render() {
        const {task, onChangeStatus, onDelete} = this.props;
        const {taskDeskription, status} = task;
        const inputChecked = status === "completed" ? true : false;
        let func = this.changeTime.bind(Task);
        setInterval(func, 20000);

        return (
            <div className='view' onClick={(e) => onChangeStatus(e)}>
                <input type="checkbox" className='toggle' defaultChecked={inputChecked}/>
                <label>
                    <span className='description'>{taskDeskription}</span>
                    <span className='created'>{this.state.timeAgo}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button 
                    className="icon icon-destroy"
                    onClick={onDelete}/>
            </div>
        )
    }
}
