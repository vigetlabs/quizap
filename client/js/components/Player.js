import React       from 'react'
import StatusLight from './shared/StatusLight'

const socket = io()

const statusText = {
  wait: 'wait',
  ready: 'Ready',
  asking: 'Zap',
  zap: 'Active',
  answering: 'Too Slow',
  nope: 'NOPE',
  yep: 'YEP'
}

export default React.createClass({
  getInitialState() {
    return {
      score: 0,
      status: 'wait'
    }
  },

  componentDidMount() {
    socket.on('yep', (zapper) => {
      if(socket.id === zapper.id) {
        this.setState({
          status: 'yep',
          score: this.state.score + 1
        })
      }
    })

    socket.on('nope', (zapper) => {
      if(socket.id === zapper.id) {
        this.setState({status: 'nope'})
      }
    })

    socket.on('reset', () => {
      this.setState({status: 'ready'})
    })

    socket.on('ready', () => {
      this.setState({status: 'ready'})
    })
  },

  zap() {
    socket.emit('zap', {
      id: socket.id
    })
    this.setState({status: 'zap'})
  },

  render() {
    return (
      <div className={`player screen -${this.state.status}`}>
        <div className="display">
          <StatusLight text={statusText[this.state.status]} status={this.state.status} />
        </div>
        <div className="buttons">
          <button className="button -zap" onClick={this.zap} disabled={this.state.status !== 'ready'}>Zap!</button>
        </div>
        <footer>
          <p>Score: {this.state.score}</p>
        </footer>
      </div>
    )
  }
})
