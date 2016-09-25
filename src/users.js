import React from 'react'
import { render } from 'react-dom'
import ListView from './listView'
import Alert from './request/alert'
import Response from './request/response'
import Trip from './request/trip'

export default class Users extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: {},
      role: this.props.role,
      view: 'list',
      trip: {}
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

      if(data.status) {
        this.setState({
          view: 'trip',
          trip: {
            user: this.props.username,
            counterpart: data.username,
            tripID: data.tripID
          }
        })
      }
    })

    this.socket.on('end trip', (data) => {
      this.setState({
        view: 'list',
        trip: {}
      })
    })

  }

  renderView() {
    if(this.state.view == 'list') {
      const counterparts = { guide: 'tourists', tourist: 'guides' }[this.state.role]

      return (
        <ListView users = { this.state.users[counterparts] }
          role = { counterparts }
          id = { this.socket.id }
          username = { this.props.username } />
      )
    } else if (this.state.view == 'trip') {
      return <Trip user = { this.state.trip.user }
                   counterpart = { this.state.trip.counterpart }
                   tripID = { this.state.trip.tripID } />
    }
  }

  render() {

    return(
      <div className = 'container'>
        <Alert id = { this.socket.id }
               ref = 'alert'
               username = { this.props.username } />
        <Response ref = 'response' />
        { this.renderView() }
      </div>
    )
  }
}
