exports.init = (app) => {
  app.get('/map', (req, res) => {
    res.render('map')
  })
}
