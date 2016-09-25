import React from 'react'
import { render } from 'react-dom'
import ListView from './listView'
import Alert from './request/alert'
import Response from './request/response'

export default class Users extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: {},
      role: this.props.role
    }

    this.socket = io('', {query: 'role='+this.props.role +
                                  '&lat='+this.props.position.lat +
                                  '&long='+this.props.position.lng});

    this.socket.on('users', (users) => {
      this.setState({users: users})
    })

    this.socket.on('make request', (id) => {
      this.refs.alert.setState({
        content: id
      })
    })

    this.socket.on('return request', (data) => {
      this.refs.response.setState({
        status: data.status,
        to: data.to,
        show: true
      })

      // presumably change the view, but that is for a later implementation
    })

  }

  render() {
    return(
      <div className = 'container'>
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <img src="https://drive.google.com/file/d/0Bwj14pSlf4NscnpUWG54M0lPN3c/view?usp=sharing"/>
            </div>
          </div>
        </div>
        <Alert id = { this.socket.id } ref = 'alert' />
        <Response ref = 'response' />
        <ListView users = { this.state.users }
                  role = { this.state.role }
                  id = { this.socket.id } />
      </div>
    )
  }
}
