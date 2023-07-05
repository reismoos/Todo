import React from 'react';

import Header from '../header';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import './app.css'

const App = () => {
    const tasks = [
        {taskDeskription: 'first task', status: 'complited', id: 1, created: 'created 7 minutes ago' },
        {taskDeskription: 'second task', status: 'editing', id: 2, created: 'created 5 minutes ago' },
        {taskDeskription: 'third task', status: 'active', id: 3, created: 'created 2 minutes ago' },
    ]
    return (
        <section className='todoapp'>
            <Header />
            <section className='main'>
                <TaskList tasks={tasks}/>
                <Footer/>
            </section>
        </section>
        
    )
}

export default App;