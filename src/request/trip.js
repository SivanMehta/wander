import React from 'react'
import { render } from 'react-dom'

export default class Trip extends React.Component {
  constructor(props) {
    super(props)
  }

  cancel() {
    $.ajax({
      url: '/api/trip/cancel',
      method: 'POST',
      contentType: 'application/json',
      datatype: 'json',
      data: JSON.stringify({
        tripID: this.props.tripID
      }),
      success: (data, status) => {
        console.log('canceled trip')
      }
    })
  }

  render() {
    return(
      <div className = 'jumbotron'>
        <p>Trip between { this.props.users.join(' and ') }</p>
        <button type="button" className="btn btn-danger" onClick = { () => { this.cancel() } } >Cancel Trip</button>
      </div>
    )
  }
}
