import { useState } from 'react'

import Header from '../header'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

const App = () => {
  const [tasks, setTasks] = useState([
    {
      taskDeskription: 'taskText',
      status: 'active',
      created: new Date(),
      id: 1,
      edit: false,
      timer: 325,
    },
  ])
  const [filter, setFilter] = useState('all')
  const [maxId, setMaxId] = useState(100)

  const createNewTask = (id, taskText, timer) => {
    return {
      taskDeskription: taskText,
      status: 'active',
      created: new Date(),
      id: id,
      edit: false,
      timer: timer,
    }
  }

  const onChangeStatus = (event, id) => {
    if (event.target.className === 'title' || event.target.className === 'toggle') {
      let status
      const checkbox = event.currentTarget.querySelector('.toggle')
      if (event.currentTarget.parentNode.className === 'completed') {
        if (event.target.className !== 'toggle') {
          checkbox.checked = !checkbox.checked
        }
        status = 'active'
      } else {
        if (event.target.className !== 'toggle') {
          checkbox.checked = !checkbox.checked
        }
        status = 'completed'
      }

      setTasks((tasks) => {
        return tasks.map((el) => {
          if (el.id === id) {
            return { ...el, status: status }
          }
          return el
        })
      })
    }
  }

  const onEdit = (id) => {
    setTasks((tasks) => {
      return tasks.map((el) => {
        if (el.id === id) {
          return { ...el, edit: true }
        }
        return el
      })
    })
  }

  const onEditKeyDown = (e, string, id) => {
    if (e.key === 'Enter') {
      setTasks((tasks) => {
        return tasks.map((el) => {
          if (el.id === id) {
            return { ...el, taskDeskription: string, edit: false }
          }
          return el
        })
      })
    } else if (e.key === 'Escape') {
      setTasks((tasks) => {
        return tasks.map((el) => {
          if (el.id === id) {
            return { ...el, edit: false }
          }
          return el
        })
      })
    }
  }

  const onDelete = (id) => {
    setTasks((tasks) => {
      return tasks.filter((el) => el.id !== id)
    })
  }

  const addNewTask = (taskText, timer) => {
    setTasks((tasks) => [...tasks, createNewTask(maxId, taskText, timer)])
    setMaxId((maxId) => maxId + 1)
  }

  const filterTasks = (status) => {
    if (status === 'all') {
      return tasks
    }

    return tasks.filter((el) => el.status === status)
  }

  const onChangeFilter = (status) => {
    setFilter(status)
  }

  const deleteAllCompleted = () => {
    setTasks((tasks) => tasks.filter((el) => el.status !== 'completed'))
  }

  const countActiveTasks = () => {
    return tasks.filter((el) => el.status === 'active').length
  }

  const visibleArr = filterTasks(filter)

  return (
    <section className="todoapp">
      <Header addNewTask={addNewTask} />
      <section className="main">
        <TaskList
          tasks={visibleArr}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
          onEdit={onEdit}
          onEditKeyDown={onEditKeyDown}
        />
        <Footer
          onChangeFilter={onChangeFilter}
          filter={filter}
          deleteAllCompleted={deleteAllCompleted}
          countActive={countActiveTasks()}
        />
      </section>
    </section>
  )
}

export default App
