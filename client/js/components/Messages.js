import React from 'react'

const socket = io()

export default React.createClass({
  getInitialState() {
    return {
      messages: []
    }
  },

  componentDidMount() {
    socket.on('user connected', () => {
      this.setState({messages: this.state.messages.concat(['user connected'])})
    })

    socket.on('chat message', (message) => {
      this.setState({messages: this.state.messages.concat([message])})
    })
  },

  sendMessage(e) {
    e.preventDefault()
    socket.emit('chat message', input.value)
    React.findDOMNode(this.refs.messageInput).value = ''
  },

  getMessages() {
    return this.state.messages.map((message, index) => {
      return <li key={index}>{message}</li>
    })
  },

  render() {
    return (
      <div>
        <ul id="messages">
          {this.getMessages()}
        </ul>
        <form id="form" onSubmit={this.sendMessage} action="">
          <input ref="messageInput" id="input" autoComplete="off"/><button>Send</button>
        </form>
      </div>
    )
  }
})
