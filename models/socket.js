// this user 'database' will eventually have to be persisted somewhere, as in-memory is not very reliable
var users = {
    tourist: 0,
    guide: 0
}

exports.init = (app) => {
    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/index.html")
    })

    const PORT = process.env.PORT || 5000
    var http = require('http').Server(app)
    var io = require('socket.io')(http)

    io.on('connection', (socket) => {
        socket.role = socket.handshake.query.role

        console.log(socket.handshake.query.lat)
        console.log(socket.handshake.query.long)

        // 'persist the user'
        users[socket.role] += 1
        io.emit('users', users)

        socket.on('disconnect', () => {
            users[socket.role] -= 1
            io.emit('users', users)
        })
    })

    http.listen(PORT, () => {
        console.log("Server listening on port " + PORT)
    })
}