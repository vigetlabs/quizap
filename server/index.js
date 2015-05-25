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

gutil.log('production server started on ' + gutil.colors.green(config.port))
