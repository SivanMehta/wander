// Define the routes for this controller
exports.init = function(app) {
	app.get('/map/', getLocation);
	// app.put('/location/:latitude/:longitude', showLocation);
}

getLocation = function(req,res){
	res.render('map');
}