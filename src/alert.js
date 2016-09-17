import React from 'react'
import { render } from 'react-dom'

export default class Alert extends React.Component {
  constructor(props) {
    super(props)
  }

  content() {
    return(
      <div className="btn-group" aria-label="...">
        <p>You have received a request from: FILL IN</p>
        <button type="button" className="btn btn-success">Accept</button>
        <button type="button" className="btn btn-danger">Deny</button>
      </div>
    )
  }

  render() {
    return(
      <div className="modal fade" id = "alertModal" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content container">
            { this.content() }
          </div>
        </div>
      </div>
  )
  }
}
