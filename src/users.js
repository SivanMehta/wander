import React from 'react'
import { render } from 'react-dom'

export default class Users extends React.Component {
  constructor(props) {
    super(props)

      this.state = {
        users: {}
      }
  }

  componentDidMount() {
    this.socket = io('', {query: 'role='+this.props.role +
                                  '&lat='+this.props.position.lat +
                                  '&long='+this.props.position.lng});
    this.socket.on('users', (users) => {
      this.setState({users: users})
    })
  }

  render() {
    console.log(this.state)
    return(
      <p>{JSON.stringify(this.state.users)}</p>
    )
  }
}
