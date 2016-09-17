import React from 'react'
import { render } from 'react-dom'

export default class ListView extends React.Component {
  constructor(props) {
    super(props)
  }

  renderButton(role, id) {
    id = id.split('#')[1]
    if(this.props.role + "s" != role) {
      return(
          <button className="btn btn-success" onClick = { (e) => { this.connectToUser(id) } }>
            Connect!
          </button>
      )
    } else {
      return <span></span>
    }
  }

  connectToUser(id) {
    console.log('send message to: ' + id + ', from: ' + this.props.id)
    $.ajax({
      url: '/api/message/' + id,
      method: 'POST',
      data: {
        from: this.props.id
      },
      success: (data, status) => {
        console.log(data)
      }
    })
  }

  renderUsers(role) {
    var result = []
    this.props.users[role] ? this.props.users[role].forEach((user) => {
      result.push(
        <li className="list-group-item">
          lat: {user.lat}, lng: {user.lng} { this.renderButton(role, user.id) }
        </li>
      )
    }) : []

    return result
  }

  render() {
    return(
      <div className = 'row'>
        <div className = 'col-sm-12 col-md-6'>
          <h1>Tourists:</h1>
          <ul className='list-group'>
            { this.renderUsers('tourists') }
          </ul>
        </div>
        <div className = 'col-sm-12 col-md-6'>
          <h1>Guides:</h1>
          <ul className='list-group'>
            { this.renderUsers('guides') }
          </ul>
        </div>
      </div>

    )
  }
}
