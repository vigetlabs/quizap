var gutil    = require('gulp-util')
var compress = require('compression')
var logger   = require('morgan')
var config   = require('./config')
var http     = require('http')

var express = require('express')
var app    = express()
var server = require('http').Server(app)

app
  .use(compress())
  .use(logger(config.logLevel))
  .use('/', express.static(config.root, config.staticOptions))

module.exports = {
  app: app,
  server: server,
  start: function() {
    server.listen(config.port)
    gutil.log('production server started on ' + gutil.colors.green(config.port))
  }
}
