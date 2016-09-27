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
    const ratings = ['smile', 'meh', 'frown']
    ratings.forEach((rating) => {
      buttons.push(
        <button type = 'button'
                className='btn btn-secondary'
                key = {rating}
                onClick = { (e) => { this.cancel() } }
                >
                <i className = { 'fa fa-' + rating + '-o' } ></i>
        </button>
      )
    })

    return buttons
  }

  render() {
    return(
      <div className = 'jumbotron'>
        <h4><strong>Trip between:</strong> { this.props.users.join(' and ') } </h4>
        <h5>Rate your trip: </h5>
        <div className='btn-group'>
          { this.renderButtons() }
        </div>
      </div>
    )
  }
}
