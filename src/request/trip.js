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

  renderButtons() {
    var buttons = []
    const ratings = ['Supoptimal', 'Meh', 'Fan-Freaking-tastic']
    ratings.forEach((rating) => {
      buttons.push(
        <button type = 'button'
                className='btn btn-secondary'
                key = {rating}
                onClick = { (e) => { this.cancel() } }
                >{rating}</button>
      )
    })

    return buttons
  }

  render() {
    return(
      <div className = 'jumbotron'>
        <p>Trip between { this.props.users.join(' and ') }</p>
        <p>Rate your trip</p>
        <div className='btn-group'>
          { this.renderButtons() }
        </div>
      </div>
    )
  }
}
