'use strict';

const path = require('path')
const env = process.env.NODE_ENV || 'development'

module.exports = require(path.join(__dirname, 'config', env + '.js')).init(__dirname)
