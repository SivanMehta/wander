import React from 'react'
import { render } from 'react-dom'
import Map from './maps/map'
var socket;

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
      socket = io('', {query: 'role='+role +
                          '&lat='+position.coords.latitude +
                          '&long='+position.coords.longitude});

      this.setState({
        page: 'map',
        role: role,
        location: {
          lat: position.coords.latitude,
          lng:position.coords.latitude
        }
      })

      socket.on('users', (data) => {
        this.setState({users: data})
      })

    });
  }

  render() {
    if(this.state.page == 'login') {
      return(
          <div id = "welcome">
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
        <Map role = { this.state.role }
             center = { this.state.location }
             users = { this.state.users }
        />
      )
    }
  }
}

render(<App />, document.getElementById('app'));
