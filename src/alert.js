import React from 'react'
import { render } from 'react-dom'

export default class Alert extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      content: false
    }
  }

  respond(response) {
    // handle request
    $.ajax({
      url: '/api/request',
      method: 'PATCH',
      contentType: 'application/json',
      datatype: 'json',
      data: JSON.stringify({
        from: this.state.content,
        to: this.props.id,
        response: response
      }),
      success: (data, status) => {
        console.log((response ? 'accepted' : 'denied') + ' trip request')
      }
    })

    // close modal
    this.setState({
      content: false
    })
  }

  render() {
    return this.state.content ? (
        <div className = 'alert alert-info'>
          <p>You have received a request from: { this.state.content }</p>
          <div className = 'btn-group'>
            <button type="button" className="btn btn-success" onClick = { (e) => { this.respond(true) } } >Accept</button>
            <button type="button" className="btn btn-danger" onClick = { (e) => { this.respond(false) } } >Reject</button>
          </div>
        </div>
    ) : <span></span>
  }
}