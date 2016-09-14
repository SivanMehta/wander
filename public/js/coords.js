
// Global Variables
var lat = null;
var lon = null;
var geoOptions = {
	timeout: 10000
};

// Get User Lat/ Lon
function successGetPos(p){

	lat = p.coords.latitude;
	lon = p.coords.longitude;
	console.log("Lat: ", lat);
	console.log("Longitude: " + lon);
	// Display Map with marker
	displayMap()
}

// In case, geolocation is not enabled in browser
function failGetPos(error){
	console.log("Error: "+error.code);
}

// Checks for geolocation and returns user coords
function getCurrentCoords(){
	// Get User Coordinates
	if(navigator.geolocation){
		success = navigator.geolocation.getCurrentPosition(successGetPos, failGetPos, geoOptions);
	}
}

// Display Map with marker
function displayMap(){
	var myLatlng = new google.maps.LatLng(lat,lon);
	var mapOptions = {
	  zoom: 15,
	  center: myLatlng
	}
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	// Display Marker on Map
	var marker = new google.maps.Marker({
	    position: myLatlng,
	    title: "Current Location",
	    map: map,
	    clickable: true,
    	draggable: true
	});

	// Display Markers for Guide
	// Scaled down image to 10x10
	var img = '../img/tourGuideMarker.png';

	// NOT WORKING CURRENTLY --
	var image = {
		url: '../img/tourGuideMarker.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(0, 32)
	};
	var shape = {
		coords: [1, 1, 1, 20, 18, 20, 18, 1],
		type: 'poly'
	};
	// -- END

	var tourists = [{loc: CMU,lat: 40.443466, lng: -79.943457}, {loc: UPitt, lat: 40.444328, lng: -79.953155}, {loc: Girasole Walnut St, lat: 40.451195, lng: -79.934610}]
	for t in tourists{
		var touristMarker = new google.maps.Marker({
			position: {lat: t.lat, lng: t.lon},
			map: map,
			icon: img,
			title: t.loc
			// icon: image,
			// shape: shape
		});
	}
}

// Init Map Callback to display map
function initMap(){

	// Set User Coordinates
	getCurrentCoords();
	// Display Null Map even before Coords async call sets coord values
	displayMap();

}


