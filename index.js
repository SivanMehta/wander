var app = require('express')();

require('./models/socket.js').init(app);
