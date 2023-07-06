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
        ]
    }

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

    render() {
        return (
            <section className='todoapp'>
                <Header />
                <section className='main'>
                    <TaskList 
                        tasks={this.state.tasks}
                        onChangeStatus={this.onChangeStatus}
                        onDelete={this.onDelete}/>
                    <Footer/>
                </section>
            </section>
            
        )
    }
}