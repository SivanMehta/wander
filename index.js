var http = require('http');
var app = require('express')();

app.get("/", (req, res) => {
    res.send("Super cool app")
});

http.createServer(app).listen(80)