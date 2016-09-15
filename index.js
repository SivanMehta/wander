var fs = require('fs');
var path = require('path');

var express = require('express')
var engine = require('ejs-locals')
var app = express();

// Configure the views
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.engine('ejs', engine);
app.set('layout', __dirname + '/views/index.ejs')

// Handle static files
app.use(express.static(__dirname + '/public'))

// start app
require('./models/socket.js').init(app)
