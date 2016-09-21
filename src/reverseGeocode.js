function reverseGeocode(lat, lng){
  var latlng = {lat: lat, lng: lng};
  // Geocoder to get address from lat/lng
  var geocoder = new google.maps.Geocoder;
  geocodeLatLng(geocoder, latlng)
}

function geocodeLatLng(geocoder, latlng) {
    geocoder.geocode({'location': latlng}, function(results, status) {
		if (status === 'OK') 
		{
			if (results[1]) 
			{
				// console log formatted address
				console.log("Address: ", results[1].formatted_address)
        	} 
        	else 
        	{
        		window.alert('No results found');
        	}
      	} 
      	else 
      	{
      		window.alert('Geocoder failed due to: ' + status);
      	}
    });
}