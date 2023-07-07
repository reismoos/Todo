import React, { Component } from 'react';

import Header from '../header';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import './app.css'

export default class App extends Component {

    state = {
        tasks: [
            {taskDeskription: 'first task', status: 'completed', id: 1, created: 'created 7 minutes ago' },
            {taskDeskription: 'second task', status: 'editing', id: 2, created: 'created 5 minutes ago' },
            {taskDeskription: 'third task', status: 'active', id: 3, created: 'created 2 minutes ago' },
        ],
        filter: 'all'
    };

    maxId = 100;

    onChangeStatus = (e, id) => {

        if (e.target.className === 'description' || e.target.className === 'toggle') {
            let status;
            const checkbox = e.currentTarget.querySelector('.toggle');
            if (e.currentTarget.parentNode.className === 'completed') {
                if(e.target.className !== 'toggle') {
                    checkbox.checked = !checkbox.checked;
                }
                status = 'active'
            } else {
                if(e.target.className !== 'toggle') {
                    checkbox.checked = !checkbox.checked;
                }
                status = 'completed'
            }

            this.setState(({tasks}) => ({
                tasks: tasks.map(el => {
                    if (el.id === id) {
                        return {...el, status: status}
                    }
                    return el
                })
            }))
        }
        
    }

    onDelete = (id) => {
        this.setState(({tasks}) => ({
            tasks: tasks.filter(el => el.id !== id)
        }))
    } 

    createNewTask = (id, taskText) => {
        return {
            taskDeskription: taskText, 
            status: 'active', 
            id: id, 
            created: 'created 7 minutes ago'
        }
    }

    addNewTask = (taskText) => {
        this.setState(({tasks}) => ({tasks: [...tasks, this.createNewTask(this.maxId, taskText)]}));
        this.maxId++
        console.log(this.state);
    }

    filterTasks = (status) => {
        if (status === 'all') {
            return this.state.tasks
        }

        return this.state.tasks.filter(el => el.status === status)
    }

    onChangeFilter = (status) => {
        this.setState({
            filter: status
        })
    }

    deleteAllCompleted = () => {
        this.setState(({tasks}) => {
            return {
                tasks: tasks.filter(el => el.status !== 'completed')
            }
        })
    }

    countActiveTasks = () => this.state.tasks.filter(el => el.status === 'active').length

    render() {

        const visibleArr = this.filterTasks(this.state.filter)
        return (
            <section className='todoapp'>
                <Header addNewTask={this.addNewTask}/>
                <section className='main'>
                    <TaskList 
                        tasks={visibleArr}
                        onChangeStatus={this.onChangeStatus}
                        onDelete={this.onDelete}/>
                    <Footer 
                        onChangeFilter={this.onChangeFilter}
                        filter={this.state.filter}
                        deleteAllCompleted={this.deleteAllCompleted} 
                        countActive={this.countActiveTasks()}/>
                </section>
            </section>
            
        )
    }
}