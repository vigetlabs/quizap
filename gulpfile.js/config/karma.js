const config = require('./')
const karmaWebpack = require('karma-webpack')
const webpackConfig = require('./webpack')('test')
const testPattern = `${config.sourceDirectory}/js/**/__test__/*`

export default {
  frameworks: ['mocha', 'sinon-chai'],
  files: [testPattern],
  preprocessors: {
    [testPattern]: ['webpack']
  },
  webpack: webpackConfig,
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')]
}
