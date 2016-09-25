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
    this.setState({page: 'users'}) // Trying to link back to page of users
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
            <h2 id="title">Welcome to Wander! </h2>
            <div className = 'col-sm-12 col-md-6'>
              <img src="img/image.png" id="home_img"></img>
            </div>
            <div className = 'col-sm-12 col-md-6'>
              <form>
                <div className="form-group row">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <input type="text" id = "username_input" className="form-control" placeholder="Username"></input>
                    <i className="fa fa-key" aria-hidden="true"></i>
                    <input type="text" id = "pw_input" className="form-control" placeholder="Password"></input>
                </div>
              </form>
                <div className = 'col-sm-12 col-md-6'>
                  <button type="button btn-block" className = "btn btn-secondary" id = "tbutton" onClick = { this.connect }>Log-in as Tourist</button>
                </div>
                <div className = 'col-sm-12 col-md-6'>
                  <button type="button btn-block" className = "btn btn-secondary" id = "gbutton" onClick = { this.connect }>Log-in as Guide</button>
                </div>
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
