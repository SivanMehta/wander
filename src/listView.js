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
        <div className='card-block'>
          <a href="#" className="btn btn-success" onClick = { (e) => { this.connectToUser(id) } }>
            Connect!
          </a>
        </div>
      )
    } else {
      return <span></span>
    }
  }

  connectToUser(id) {
    $.ajax({
      url: '/api/request',
      method: 'POST',
      contentType: 'application/json',
      datatype: 'json',
      data: JSON.stringify({
        to: id,
        from: this.props.id
      }),
      success: (data, status) => {
        console.log('sent message to ' + id)
      }
    })
  }

  renderUsers(role) {
    var result = []
    this.props.users[role] ? this.props.users[role].forEach((user) => {
      result.push(
        <div className="card">
          <div className="col-md-4">
            <img className="card-img-top" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=600&h=200" alt="Card image cap" />
          </div>
          <div className="col-md-8">
            <div className="card-block">
              <h4 className="card-title">Joe Schmoe</h4>
              <p className="card-text">{user.address}</p>
            </div>
          </div>
          { this.renderButton(role, user.id) }
        </div>
      )
    }) : []

    return result
  }

  render() {
    const tourists = this.renderUsers('tourists')
    const guides = this.renderUsers('guides')

    return(
      <div className = 'row'>
        <div className = 'col-sm-12 col-md-6'>
          <h2>Tourists:</h2>
            { tourists.length != 0 ? tourists : 'There are no tourists currently connected'}
        </div>
        <div className = 'col-sm-12 col-md-6'>
          <h2>Guides:</h2>
            { guides.length != 0 ? guides : 'There are no guides currently connected'}
        </div>
      </div>

    )
  }
}
