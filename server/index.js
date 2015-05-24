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
  socket.broadcast.emit('user connected');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg)
  })
})

gutil.log('production server started on ' + gutil.colors.green(config.port))
