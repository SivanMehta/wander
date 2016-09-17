import React from 'react'
import { render } from 'react-dom'
import ListView from './listView'
import Alert from './alert'

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

    this.socket.on('request', (id) => {
      this.refs.alert.setState({
        content: id
      })
    })

  }

  render() {
    return(
      <div className = 'container'>
        <Alert id = { this.socket.id } ref = 'alert' />
        <ListView users = { this.state.users }
                  role = { this.state.role }
                  id = { this.socket.id } />
      </div>
    )
  }
}
