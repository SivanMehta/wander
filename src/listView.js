import React from 'react'
import { render } from 'react-dom'

export default class ListView extends React.Component {
  constructor(props) {
    super(props)
  }

  renderButton(id) {
    id = id.split('#')[1]
    return(
      <div className='card-block'>
        <a href="#" className="btn btn-success" onClick = { (e) => { this.connectToUser(id) } }>
          Connect!
        </a>
      </div>
    )

  }

  connectToUser(id) {
    $.ajax({
      url: '/api/request',
      method: 'POST',
      contentType: 'application/json',
      datatype: 'json',
      data: JSON.stringify({
        to: id,
        from: {
          id: this.props.id,
          username: this.props.username
        }
      }),
      success: (data, status) => {
        console.log('sent message to ' + id)
      }
    })
  }

  renderUsers() {
    var result = []
    this.props.users ? this.props.users.forEach((user) => {
      result.push(
        <div className="card">
          <img className="card-img-top" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=600&h=200" alt="Card image cap" />
          <div className="card-block">
            <h4 className="card-title">{user.username}</h4>
            <p className="card-text">{user.address}</p>
          </div>
          { this.renderButton(user.id) }
        </div>
      )
    }) : []

    return result
  }

  render() {
    const users = this.renderUsers()
    const role = this.props.role[0].toUpperCase() + this.props.role.substr(1)


    return(
      <div className = 'row'>
        <div className = 'col-sm-12 col-md-6'>
          <h1>Available { role }:</h1>
            { users.length != 0 ? users : 'There are no ' + this.props.role + ' currently connected'}
        </div>
      </div>

    )
  }
}
