var express = require('express')
var app = express();

// logging
var morgan = require('morgan')
app.use(morgan('dev'))

// body parsing
app.use(require('body-parser').json())

// Handle static files
app.use(express.static(__dirname + '/public'))

// start app
require('./models/socket.js').init(app)
