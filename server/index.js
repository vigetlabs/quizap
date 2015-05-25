var gutil    = require('gulp-util')
var compress = require('compression')
var logger   = require('morgan')
var config   = require('./config')
var http     = require('http')

var express = require('express')
var app    = express()
var server = require('http').Server(app)
var io     = require('socket.io')(server)

app
  .use(compress())
  .use(logger(config.logLevel))
  .use('/', express.static(config.root, config.staticOptions))

server.listen(config.port)

io.on('connection', function(socket){
  socket.broadcast.emit('player connected');

  socket.on('yep', function(zap) {
    console.log('yep', zap)
    io.emit('yep', zap)
  })

  socket.on('nope', function(zap){
    console.log('nope', zap)
    io.emit('nope', zap)
  })

  socket.on('reset', function() {
    console.log('reset')
    io.emit('reset')
  })

  socket.on('zap', function(zap) {
    console.log('zap', zap)
    io.emit('zap', zap)
  })
})

gutil.log('production server started on ' + gutil.colors.green(config.port))
