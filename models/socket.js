const async = require('async');
const path = require('path');
const LRU = require('lru-cache')

var geocoder = require('geocoder');

exports.init = (app) => {
    /*
      This user 'database' would eventually have to be persisted
      somewhere, as in-memory is not very reliable.
    */
    var users = {
        tourist: {},
        guide: {},
    }

    /*
      Similar to above, this would have to eventually be stored
      in a more reliably consistent data store
    */
    var tripRequests = LRU({
      maxAge: 1000 * 60 * 5 // tripRequests only are 'remembered for 5 minutes'
    })


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

        // Reverse Geocoding 
        var lat = socket.lat
        var lng = socket.long
        geocoder.reverseGeocode(lat, lng, function ( err, data ) {
          // 'persist the user'
          users[socket.role][socket.id] = {
              lat: socket.lat,
              lng: socket.long,
              address: data.results[1].formatted_address,
              id: socket.id
          }
          emitUserInfo()
        });

        socket.on('disconnect', () => {
            delete users[socket.role][socket.id];
            emitUserInfo()
        })
    })

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'))
    })

    app.post('/api/request', (req, res) => {
      // ping recipient
      io.to("/#" + req.body.to).emit('make request', req.body.from)

      // 'persist' the request such that one user can only request
      // one at a time
      tripRequests.set(req.body.from, {
        user: req.body.to,
        status: 'pending'
      })

      // confirm message went through
      res.send(req.params.to)
    })

    app.patch('/api/request', (req, res) => {
      // ping sender
      io.to('/#' + req.body.from).emit('return request', {
        to: req.body.to,
        status: req.body.response
      })

      tripRequests.set(req.body.from, {
        user: req.body.to,
        status: req.body.content
      })
    })

    app.get('/debug/tripRequests', (req, res) => {
      res.send('Total Requests: ' + tripRequests.length);
    })

    app.get('/debug/tripRequests/empty', (req, res) => {
      tripRequests.reset()
      res.send('Total Requests: ' + tripRequests.length);
    })

    http.listen(PORT, () => {
        console.log("Server started on port " + PORT)
    })
}
