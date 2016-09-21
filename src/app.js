import React from 'react'
import { render } from 'react-dom'
import Users from './users'

function reverseGeocode(lat, lng){
  var latlng = {lat: lat, lng: lng};
  // Geocoder to get address from lat/lng
  var geocoder = new google.maps.Geocoder;
  geocodeLatLng(geocoder, latlng)
}

function geocodeLatLng(geocoder, latlng) {
    geocoder.geocode({'location': latlng}, function(results, status)
    {
      if (status === 'OK') 
      {
        if (results[1]) 
        {
          // console log formatted address
          console.log("Address: ", results[1].formatted_address)
          return results[1].formatted_address;
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

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'login'
    }
    this.connect = this.connect.bind(this);
  }

  connect(event) {
    this.setState({page: 'loading'})
    const role = event.target.id == 'tbutton' ? 'tourist' : 'guide'
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        page: 'users',
        role: role,
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    })

  }

  render() {
    if(this.state.page == 'login') {
      return(
          <div className = 'container'>
            <h1>Connect As: </h1>
            <div className="btn-group" role = "group">
            <button type="button" className = "btn btn-default" id = "tbutton" onClick = { this.connect }>Tourist</button>
            <button type="button" className = "btn btn-default" id = "gbutton" onClick = { this.connect }>Guide</button>
            </div>
          </div>
        )
    } else if (this.state.page == 'loading') {
      return(
        <center>
          <span className='glyphicon glyphicon-repeat' aria-hidden='true'></span>
        </center>
      )
    } else {
      return (
        <Users role = { this.state.role }
               view = { 'users' }
               position = { this.state.position }/>
      )
    }
  }
}

render(<App />, document.getElementById('app'));
