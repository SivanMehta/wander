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

  render() {
    if(this.state.page == 'login') {
      return(
          <div className = 'container'>
            <div className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">Wander</a>
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
                  <img src="https://drive.google.com/file/d/0Bwj14pSlf4NscnpUWG54M0lPN3c/view?usp=sharing"/>
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
        <Users role = { this.state.role }
               view = { 'users' }
               position = { this.state.position }/>
      )
    }
  }
}

render(<App />, document.getElementById('app'));
