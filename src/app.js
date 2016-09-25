import React from 'react'
import { render } from 'react-dom'
import Users from './users'

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

  homepage(event) {
    this.setState({page: 'users'})
  }

  render() {
    if(this.state.page == 'login') {
      return(
          <div className = 'container'>
            <div className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <p id="logo">Wander</p>
                </div>
              </div>
            </div>
            <h1>Connect As: </h1>
            <div className="btn-group" role = "group">
              <button type="button" className = "btn btn-secondary" id = "tbutton" onClick = { this.connect }>Tourist</button>
              <button type="button" className = "btn btn-secondary" id = "gbutton" onClick = { this.connect }>Guide</button>
            </div>
          </div>
        )
    } else if (this.state.page == 'loading') {
      return(
        <div className = 'container'>
          <div className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <p id="logo">Wander</p>
              </div>
            </div>
          </div>
          <center>
            <i className="fa fa-repeat" aria-hidden="true"></i>
          </center>
        </div>
      )
    } else {
      return (
        <div className = 'container'>
          <div className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <div className = 'col-sm-4'>
                  <button type="button" className = "btn btn-secondary btn-large" id="home_btn" onClick = { this.homepage }>
                    <i className="fa fa-home" aria-hidden="true"></i>
                  </button>
                </div>
                <div className = 'col-sm-4'>
                  <p id="logo">Wander</p>
                </div>
              </div>
            </div>
          </div>
          <Users role = { this.state.role }
                 view = { 'users' }
                 position = { this.state.position }/>
        </div>
      )
    }
  }
}

render(<App />, document.getElementById('app'));
