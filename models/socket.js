const async = require('async')
const path = require('path')
const words = require('random-words')
var geocoder = require('geocoder');


exports.init = (app) => {
    /*
      This user 'database' would eventually have to be persisted
      somewhere, as in-memory is not very reliable.
    */
    var users = {
        tourist: {},
        guide: {}
    }

    /*
      Similar to above, this would have to eventually be stored
      in a more reliably consistent data store
    */
    var trips = {}

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
        // Reverse Geocoding
        var lat = socket.handshake.query.lat
        var lng = socket.handshake.query.long
        geocoder.reverseGeocode(lat, lng, function ( err, data ) {
          // 'persist the user'
          users[socket.handshake.query.role][socket.handshake.query.username] = {
              lat: socket.handshake.query.lat,
              lng: socket.handshake.query.long,
              address: data.results[1].formatted_address,
              id: socket.id,
              username: socket.handshake.query.username
          }
          emitUserInfo()
        });

        socket.on('disconnect', () => {
            delete users[socket.handshake.query.role][socket.handshake.query.username];
            emitUserInfo()
        })
    })

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'))
    })

    app.post('/api/request', (req, res) => {
      // ping recipient
      io.to("/#" + req.body.to).emit('make request', req.body.from)

      // confirm message went through
      res.send(req.params.to)
    })

    app.post('/api/trip/create', (req, res) => {
      // deny request
      if(!req.body.response) {
        io.to('/#' + req.body.id).emit('deny trip', {
          from: req.body.from
        })
        return;
      }

      // accept trip
      const tripID = words({ exactly: 5, join: '-' })
      // 'create' the trip, in memory for now
      trips[tripID] = [req.body.to, req.body.id]

      trips[tripID].forEach((user) => {
        io.to('/#' + user).emit('start trip', {
          tripID: tripID,
          users: req.body.usernames
        })
      })

      res.send(true)
    })

    app.post('/api/trip/cancel', (req, res) => {
      // tell users to cut it out
      trips[req.body.tripID] ? trips[req.body.tripID].forEach((user) => {
        io.to('/#' + user).emit('end trip', {})
      }) : ''

      // forget that trip ever happened
      delete trips[req.body.tripID]
      res.send(true)
    });

    http.listen(PORT, () => {
        console.log("Server started on port " + PORT)
    })
}
