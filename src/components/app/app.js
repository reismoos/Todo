import { Component } from 'react'

import Header from '../header'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'
/* import './app.css' */

export default class App extends Component {
  state = {
    tasks: [
      {
        taskDeskription: 'taskText',
        status: 'active',
        created: new Date(),
        id: 1,
        edit: false,
        timer: 325,
      },
    ],
    filter: 'all',
  }

  createNewTask = (id, taskText, timer) => {
    return {
      taskDeskription: taskText,
      status: 'active',
      created: new Date(),
      id: id,
      edit: false,
      timer: timer,
    }
  }

  maxId = 100

  onChangeStatus = (e, id) => {
    if (e.target.className === 'title' || e.target.className === 'toggle') {
      let status
      const checkbox = e.currentTarget.querySelector('.toggle')
      if (e.currentTarget.parentNode.className === 'completed') {
        if (e.target.className !== 'toggle') {
          checkbox.checked = !checkbox.checked
        }
        status = 'active'
      } else {
        if (e.target.className !== 'toggle') {
          checkbox.checked = !checkbox.checked
        }
        status = 'completed'
      }

      this.setState(({ tasks }) => ({
        tasks: tasks.map((el) => {
          if (el.id === id) {
            return { ...el, status: status }
          }
          return el
        }),
      }))
    }
  }

  onEdit = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((el) => {
        if (el.id === id) {
          return { ...el, edit: true }
        }
        return el
      }),
    }))
  }

  onEditKeyDown = (e, string, id) => {
    if (e.key === 'Enter') {
      this.setState(({ tasks }) => ({
        tasks: tasks.map((el) => {
          if (el.id === id) {
            return { ...el, taskDeskription: string, edit: false }
          }
          return el
        }),
      }))
    } else if (e.key === 'Escape') {
      this.setState(({ tasks }) => ({
        tasks: tasks.map((el) => {
          if (el.id === id) {
            return { ...el, edit: false }
          }
          return el
        }),
      }))
    }
  }

  onDelete = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((el) => el.id !== id),
    }))
  }

  addNewTask = (taskText, timer) => {
    this.setState(({ tasks }) => ({ tasks: [...tasks, this.createNewTask(this.maxId, taskText, timer)] }))
    this.maxId++
  }

  filterTasks = (status) => {
    if (status === 'all') {
      return this.state.tasks
    }

    return this.state.tasks.filter((el) => el.status === status)
  }

  onChangeFilter = (status) => {
    this.setState({
      filter: status,
    })
  }

  deleteAllCompleted = () => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter((el) => el.status !== 'completed'),
      }
    })
  }

  countActiveTasks = () => this.state.tasks.filter((el) => el.status === 'active').length

  render() {
    const visibleArr = this.filterTasks(this.state.filter)
    return (
      <section className="todoapp">
        <Header addNewTask={this.addNewTask} />
        <section className="main">
          <TaskList
            tasks={visibleArr}
            onChangeStatus={this.onChangeStatus}
            onDelete={this.onDelete}
            onEdit={this.onEdit}
            onEditKeyDown={this.onEditKeyDown}
          />
          <Footer
            onChangeFilter={this.onChangeFilter}
            filter={this.state.filter}
            deleteAllCompleted={this.deleteAllCompleted}
            countActive={this.countActiveTasks()}
          />
        </section>
      </section>
    )
  }
}
