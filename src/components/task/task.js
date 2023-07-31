import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Task = (props) => {
  const { task, onChangeStatus, onDelete, onEdit } = props
  const { taskDeskription, status } = task
  const [timeAgo, setTimeAgo] = useState('less than 5 seconds ago')
  const [timer, setTimer] = useState(task.timer)
  const [startCounting, setStartCounting] = useState(false)

  const changeTime = () => {
    const t = formatDistanceToNow(task.created, { includeSeconds: true })
    if (timeAgo !== t + ' ago') {
      setTimeAgo(t + ' ago')
    }
  }

  useEffect(() => {
    let changeCreatedTime = setInterval(changeTime, 5000)
    return () => clearInterval(changeCreatedTime)
  }, [])

  const viewTimer = (time) => {
    let seconds, minutes, hours
    hours = Math.floor(time / 3600)
    minutes = Math.floor((time % 3600) / 60)
    seconds = time % 60

    function addZero(n) {
      return String(n).length < 2 ? '0' + n : n
    }

    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`
  }

  const stopTimer = (intervalName) => {
    clearInterval(intervalName)
    setStartCounting(false)
  }

  useEffect(() => {
    let counting
    if (startCounting) {
      counting = setInterval(() => {
        setTimer((timer) => +timer - 1)
        timer === 1 ? stopTimer(counting) : null
      }, 1000)
    }
    return () => clearInterval(counting)
  }, [startCounting, timer])

  const inputChecked = status === 'completed' ? true : false

  const onStartCounting = (event) => {
    if (event.detail === 1) {
      setStartCounting(true)
    }
  }

  const onStopCounting = () => {
    setStartCounting(false)
  }
  return (
    <div className="view" onClick={(event) => onChangeStatus(event)}>
      <input type="checkbox" className="toggle" defaultChecked={inputChecked} />
      <label>
        <span className="title">{taskDeskription}</span>
        <span className="description">
          <button className="icon icon-play" onClick={onStartCounting}></button>
          <button className="icon icon-pause" onClick={onStopCounting}></button>
          {viewTimer(timer)}
        </span>
        <span className="description">{timeAgo}</span>
      </label>
      <button className="icon icon-edit" onClick={onEdit}></button>
      <button className="icon icon-destroy" onClick={onDelete} />
    </div>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    taskDeskription: PropTypes.string.isRequired,
    created: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
}

export default Task
