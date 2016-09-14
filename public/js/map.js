
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
function displayMap() {
	// Create Map
	var myLatlng = new google.maps.LatLng(lat,lon);
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
    	// draggable: true
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

	// Create tourist markers
	// InfoWindow: Only one open at one time
	var infowindow = new google.maps.InfoWindow();
	for (var i = 0; i < tourists.length; i++) {
		var t = tourists[i];
		// InfoWindow Content for tourist
		var contentString = "<p> Pickup: "+t[0]+"<br>"+
							"Interest: "+interests[i]+"<br>"+
							"Duration: "+durations[i] + "</p>";
		// Create Tourist Marker
		var touristMarker = new google.maps.Marker({
			position: {lat: t[1], lng: t[2]},
			icon: img,
			title: t[0],
			map: map,
			infowindow: infowindow,
			cs: contentString
		});
    google.maps.event.addListener(touristMarker, 'click', function() {
			// Close other infoWindows
    	this.infowindow.close();
    	// Set new infoWindow
    	this.infowindow.setContent(this.cs);
    	this.infowindow.open(map, this);
    });
	};

	$('#map').css('position', 'static');
}

// Init Map Callback to display map
function initMap() {
	// Set User Coordinates
	getCurrentCoords();
	// Display Null Map even before Coords async call sets coord values
	displayMap();
}
