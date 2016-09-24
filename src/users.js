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
                                  '&long='+this.props.position.lng +
                                  '&username='+this.props.username});

    this.socket.on('users', (users) => {
      this.setState({users: users})
    })

    this.socket.on('make request', (data) => {
      this.refs.alert.setState({
        content: data
      })
    })

    this.socket.on('return request', (data) => {
      this.refs.response.setState({
        status: data.status,
        to: data.to,
        username: data.username,
        show: true
      })

      // presumably change the view, but that is for a later implementation
    })

  }

  render() {
    const counterparts = { guide: 'tourists', tourist: 'guides' }[this.state.role]

    return(
      <div className = 'container'>
        <Alert id = { this.socket.id }
               ref = 'alert'
               username = { this.props.username } />
        <Response ref = 'response' />
        <ListView users = { this.state.users[counterparts] }
                  role = { counterparts }
                  id = { this.socket.id }
                  username = { this.props.username } />
      </div>
    )
  }
}
