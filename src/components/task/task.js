import { Component } from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends Component {
  state = {
    timeAgo: 'less than 5 seconds ago',
    timer: this.props.task.timer,
    startCounting: false,
  }

  changeCreatedTime
  componentDidMount() {
    this.changeCreatedTime = setInterval(this.changeTime, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.changeCreatedTime)
  }

  changeTime = () => {
    const t = formatDistanceToNow(this.props.task.created, { includeSeconds: true })
    if (this.state.timeAgo !== t) {
      this.setState(() => {
        return {
          timeAgo: t + ' ago',
        }
      })
    }
  }

  changeTimer = () => {
    this.setState(({ timer }) => {
      if (timer > 0) {
        return { timer: this.state.timer - 1 }
      }
    })
  }

  viewTimer = (time) => {
    let seconds, minutes, hours
    hours = Math.floor(time / 3600)
    minutes = Math.floor((time % 3600) / 60)
    seconds = time % 60

    function addZero(n) {
      return String(n).length < 2 ? '0' + n : n
    }

    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`
  }

  onStartTimer = () => {
    this.setState({ startCounting: true })
  }

  onStopTimer = () => {
    this.setState({ startCounting: false })
  }

  counting

  componentDidUpdate(prevProps, prevState) {
    if (this.state.startCounting !== prevState.startCounting) {
      if (this.state.startCounting) {
        this.counting = setInterval(() => {
          this.setState(({ timer }) => ({
            timer: timer - 1,
          }))
          this.state.timer === 1 ? clearInterval(this.counting) : null
        }, 1000)
      } else {
        clearInterval(this.counting)
      }
    }
  }

  static propTypes = {
    task: PropTypes.shape({
      taskDeskription: PropTypes.string.isRequired,
      created: PropTypes.object.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onChangeStatus: PropTypes.func.isRequired,
  }

  render() {
    console.log(this.state.timer, 'timer')
    const { task, onChangeStatus, onDelete, onEdit } = this.props
    const { taskDeskription, status } = task
    const inputChecked = status === 'completed' ? true : false

    return (
      <div className="view" onClick={(e) => onChangeStatus(e)}>
        <input type="checkbox" className="toggle" defaultChecked={inputChecked} />
        <label>
          <span className="title">{taskDeskription}</span>
          <span className="description">
            <button className="icon icon-play" onClick={this.onStartTimer}></button>
            <button className="icon icon-pause" onClick={this.onStopTimer}></button>
            {this.viewTimer(this.state.timer)}
          </span>
          <span className="description">{this.state.timeAgo}</span>
        </label>
        <button className="icon icon-edit" onClick={onEdit}></button>
        <button className="icon icon-destroy" onClick={onDelete} />
      </div>
    )
  }
}
