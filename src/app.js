import React from 'react'
import { render } from 'react-dom'
import Users from './users'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'login',
      error: false
    }
    this.connect = this.connect.bind(this);
  }

  connect(event) {
    // validate username
    if(this.refs.username.value.length < 3) {
      this.setState({error: 'Username must be at least 3 characters'})
      return
    }

    // load the page
    this.setState({page: 'loading', username: this.refs.username.value})
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

  renderUsernameField() {
    if(!this.state.error) {
      return (
        <div>
          <input className="form-control" type="text" placeholder="Username" ref="username" />
          <input className="form-control" type="password" placeholder="Password"></input>
        </div>
      )
    } else {
      return(
        <div className='has-warning'>
          <input className="form-control form-control-warning" type="text" placeholder="Username" ref="username"/>
          <input className="form-control" type="password" placeholder="Password"></input>
          <div className="form-control-feedback">{ this.state.error }</div>
        </div>
      )
    }
  }

  renderContent() {
    if(this.state.page == 'login') {
      return(
          <div>
            <h1>Welcome to Wander! </h1>
            <div className = 'col-sm-12 col-md-6'>
              <img src="img/image.png"></img>
            </div>
            <div className = 'col-sm-12 col-md-6'>
              { this.renderUsernameField() }
              <br />
              <button type = "button"
                      className = "btn btn-secondary"
                      id = "tbutton"
                      onClick = { this.connect }>
                        Connect As Tourist <i className="fa fa-pied-piper-alt"></i>
              </button>
              <br />
              <button type = "button"
                      className = "btn btn-secondary"
                      id = "gbutton"
                      onClick = { this.connect }>
                        Connect As Guide <i className="fa fa-map-o"></i>
              </button>
            </div>
          </div>
        )
    } else if (this.state.page == 'loading') {
      return(
        <center>
          <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
        </center>
      )
    } else {
      return(
        <Users role = { this.state.role }
               view = { 'users' }
               position = { this.state.position }
               username = { this.state.username } />
      )
    }
  }

  homepage(event) {
    this.setState({page: 'users'}) // Trying to link back to page of users
  }

  render() {
    return(
        <div>
          <div className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <p id="logo">Wander</p>
              </div>
            </div>
          </div>
          <div className = 'container'>
            { this.renderContent() }
          </div>
        </div>
      )
  }
}

render(<App />, document.getElementById('app'));
