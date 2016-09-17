const async = require('async');
const path = require('path');

exports.init = (app) => {
    // this user 'database' will eventually have to be persisted somewhere, as in-memory is not very reliable
    var users = {
        tourist: {},
        guide: {},
    }


    const PORT = process.env.PORT || 5000
    app.set('port', PORT);
    var http = require('http').Server(app)
    var io = require('socket.io')(http)

    emitUserInfo = () => {
        async.parallel({
            tourists: (callback) => { countUsers('tourist', callback) },
            guides: (callback) => { countUsers('guide', callback) }
        }, (err, results) => {
            io.emit('users', results)
        })
    }

    countUsers = (userType, callback) => {
        async.map(users[userType], (user, next) => {
            next(null, user)
        }, (err, result) => {
            callback(null, result)
        })
    }

    io.on('connection', (socket) => {
        socket.role = socket.handshake.query.role
        socket.lat = socket.handshake.query.lat
        socket.long = socket.handshake.query.long

        // 'persist the user'
        users[socket.role][socket.id] = {
            lat: socket.lat,
            lng: socket.long,
            id: socket.id
        }
        emitUserInfo()

        socket.on('disconnect', () => {
            delete users[socket.role][socket.id];
            emitUserInfo()
        })
    })

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'))
    })

    app.post('/api/message/:to', (req, res) => {
      io.to("/#" + req.params.to).emit('request', 'you have received a request from ' + req.body.from)
      res.send(req.params.to)
    })

    http.listen(PORT, () => {
        console.log("Server started on port " + PORT)
    })
}
