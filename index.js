var fs = require('fs');
var path = require('path');

var express = require('express')
var engine = require('ejs-locals')
var app = express();

// Handle static files
app.use(express.static(__dirname + '/public'))

// start app
require('./models/socket.js').init(app)
