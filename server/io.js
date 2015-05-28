var server = require('./server').server
var io = require('socket.io')(server)

var store = {
  players: 0
}

io.on('connection', function(socket){
  store.players++
  socket.broadcast.emit('player connected', store)

  socket.on('leave', function() {
    store.players--
    console.log('leave')
    io.emit('leave', store)
  })

  socket.on('yep', function(zap) {
    io.emit('yep', zap)
  })

  socket.on('nope', function(zap){
    io.emit('nope', zap)
  })

  socket.on('reset', function() {
    io.emit('reset')
  })

  socket.on('zap', function(zap) {
    io.emit('zap', zap)
  })

  socket.on('ready', function() {
    io.emit('ready')
  })

  socket.on('wait', function() {
    io.emit('wait')
  })
})

module.exports = io
