var config = require('./')

module.exports = {
  proxy: 'localhost:5000',
  files: ['public/**/*.html'],
  ghostMode: {
    clicks: true,
    forms: false,
    scroll: false
  }
}
