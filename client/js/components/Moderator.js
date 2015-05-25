import React from 'react'
import StatusLight from './shared/StatusLight'

const socket = io()

const statusText = {
  wait: 'Activate',
  ready: 'Ready',
  zap: 'Zap',
  nope: 'Nope',
  yep: 'Yep'
}

export default React.createClass({
  getInitialState() {
    return {
      zaps: [],
      status: 'wait',
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
      state.status = 'zap'
    }
    this.setState(state)
  },

  ready() {
    this.setState({
      status: 'ready'
    })
    socket.emit('ready')
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

  getButtons() {
    const zap = !!this.state.zaps[0]
    if(zap) {
      return [
        <button className="button -yep" disabled={!zap} onClick={this.yep}>Yep!</button>,
        <button className="button -nope" disabled={!zap} onClick={this.nope}>Nope!</button>,
      ]
    } else {
      if(this.state.status === 'ready') {
        return <button className="button -reset" onClick={this.reset}>Reset</button>
      } else {
        return <button className="button -ready" disabled={zap} onClick={this.ready}>Ready</button>
      }
    }
  },

  render() {
    return (
      <div className={`moderator screen -${this.state.status}`}>
        <div className="display">
          <StatusLight text={statusText[this.state.status]} status={this.state.status} />
        </div>
        <div className="buttons">
          {this.getButtons()}
        </div>
        <p>Players: {this.state.playerTotal}</p>
      </div>
    )
  }
})
