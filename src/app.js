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
          <input className="form-control" type="text" placeholder="Enter Your Name" ref="username" id='username'/>
        </div>
      )
    } else {
      return(
        <div className='has-warning'>
          <input className="form-control form-control-warning" type="text" placeholder="Enter Your Name" ref="username" id='username'/>
          <div className="form-control-feedback">{ this.state.error }</div>
        </div>
      )
    }
  }

  render() {
    if(this.state.page == 'login') {
      return(
          <div className = 'container'>
            <h1>Welcome to Wander! </h1>
            { this.renderUsernameField() }
            <br />
            <button type="button" className = "btn btn-secondary" id = "tbutton" onClick = { this.connect }>Connect As Tourist</button>
            <br />
            <button type="button" className = "btn btn-secondary" id = "gbutton" onClick = { this.connect }>Connect As Guide</button>
          </div>
        )
    } else if (this.state.page == 'loading') {
      return(
        <center>
          <i className="fa fa-repeat" aria-hidden="true"></i>
        </center>
      )
    } else {
      return (
        <Users role = { this.state.role }
               view = { 'users' }
               position = { this.state.position }
               username = { this.state.username } />
      )
    }
  }
}

render(<App />, document.getElementById('app'));
