import React from 'react'
const socket = io()

const statusText = {
  ready: 'Ready...',
  asking: 'Zap to answer!',
  zapped: 'Waiting for your answer...',
  answering: 'Too Slow.',
  nope: 'NOPE.',
  yep: 'YEP!'
}

export default React.createClass({
  getInitialState() {
    return {
      score: 0,
      status: 'ready'
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

    socket.on('live', () => {
      this.setState({status: 'live'})
    })
  },

  zap() {
    socket.emit('zap', {
      id: socket.id
    })
    this.setState({status: 'zapped'})
  },

  render() {
    return (
      <div className={`player screen -${this.state.status}`}>
        <div className="display">
          <h1 className="status">
            { statusText[this.state.status] }
          </h1>
        </div>
        <div className="buttons">
          <button onClick={this.zap} disabled={this.state.status === 'zapped'}>Zap!</button>
        </div>
        <footer>
          <p>Score: {this.state.score}</p>
          <p>Players: {this.state.playerTotal}</p>
        </footer>
      </div>
    )
  }
})
