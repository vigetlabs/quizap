import React from 'react'
const socket = io()

const statusText = {
  ready: 'Ready...',
  live: 'Ask the question.',
  zaps: 'Are they right?',
  nope: 'NOPE.',
  yep: 'YEP!'
}

export default React.createClass({
  getInitialState() {
    return {
      zaps: [],
      status: 'ready',
      playerTotal: 0
    }
  },

  getDefaultProps() {
    return {
      resetDelay: 2000 // ms
    }
  },

  componentDidMount() {
    socket.on('zap', this.addZap)
    socket.on('player connected', this.addPlayer)
  },

  addPlayer() {
    this.setState({
      playerTotal: this.state.playerTotal + 1
    })
  },

  addZap(zap) {
    const zaps = this.state.zaps.concat(zap)
    const state = {zaps}
    if(!this.state.zaps.length) {
      state.status = 'zaps'
    }
    this.setState(state)
  },

  live() {
    this.setState({
      status: 'live'
    })
  },

  yep() {
    this.setState({
      status: 'yep'
    })
    socket.emit('yep', this.state.zaps[0])
    setTimeout(this.reset, this.props.resetDelay)
  },

  nope() {
    this.setState({
      zaps: this.state.zaps.slice(1),
      status: 'nope'
    })
    socket.emit('nope', this.state.zaps[0])
    setTimeout(this.reset, this.props.resetDelay)
  },

  reset() {
    socket.emit('reset')
    this.setState({
      zaps: [],
      zapIndex: 0,
      status: 'ready'
    })
  },

  render() {
    const zap = !!this.state.zaps[0]

    return (
      <div className={`moderator screen -${this.state.status}`}>
        <div className="display">
          <h1 className="status">
          { statusText[this.state.status] }
          </h1>
          <p>Players: {this.state.playerTotal}</p>
        </div>
        <div className="buttons">
          <button className="button -yep" disabled={!zap} onClick={this.yep}>Yep!</button>
          <button className="button -nope" disabled={!zap} onClick={this.nope}>Nope!</button>
          <button className="button -ready" disabled={zap} onClick={this.live}>{ this.state.status === 'live' ? 'Locked and Loaded.' : 'Ready?'}</button>
          <button className="button -reset" onClick={this.reset}>Reset</button>
        </div>
      </div>
    )
  }
})
