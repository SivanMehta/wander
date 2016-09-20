
// Global Variables
var lat = null;
var lon = null;
var geoOptions = {
	timeout: 10000
};

// Get User Lat/ Lon
function successGetPos(p) {

	lat = p.coords.latitude;
	lon = p.coords.longitude;
	// Display Map with marker
	displayMap()
}

// In case, geolocation is not enabled in browser
function failGetPos(error) {
	console.log("Error: " + error.stack);
}

// Checks for geolocation and returns user coords
function getCurrentCoords() {
	// Get User Coordinates
	if(navigator.geolocation) {
		success = navigator.geolocation.getCurrentPosition(successGetPos, failGetPos, geoOptions);
	}
}

// Display Map with marker
function displayMap(data) {
	var lat = 40.446
	var long = -80.051
	// Create Map
	var myLatlng = new google.maps.LatLng(lat,long);
	var mapOptions = {
	  zoom: 15,
	  center: myLatlng
	}
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	// Display Tour Guide Marker on Map
	var tourGuideMarker = new google.maps.Marker({
	    position: myLatlng,
	    title: "Current Location",
	    map: map,
	    clickable: true
	});
	// Scaled down image to 10x10
	var img = '../img/tourGuideMarker.png';
	var tourists = [
		['CMU', 40.443466, -79.943457],
		['UPitt', 40.444328, -79.953155],
		['Girasole Walnut St', 40.451195, -79.934610]
	];
	var interests = ["Oakland Sightseeing", "Cathedral of Learning and Restaurants", "Shadyside Shopping and Ice Cream"];
	var durations = ["2 hours", "2 hours", "3 hours"];

	// InfoWindow: Only one open at one time
	var infowindow = new google.maps.InfoWindow()
	// Create tourist markers
	for(var i = 0; i < data.tourists.length; i++) {
		const contentString = "<p>Tourist</p>";
		// Get Tourist Lat/ Long from values passed
		const coords = {
			lat: parseFloat(data.tourists[i].lat),
			lng: parseFloat(data.tourists[i].lng)
		}
		var touristMarker = new google.maps.Marker({
			position: coords,
			map: map,
			cs: contentString,
			clickable: true,
			icon: img
		})
		// when you click on marker, show tourist data
		google.maps.event.addListener(touristMarker, 'click', function() {
			infowindow.close()
			infowindow.setContent(this.cs)
    	infowindow.open(map, this)
		})
	}
}

// Init Map Callback to display map
function initMap(data) {
	displayMap(data);
}
