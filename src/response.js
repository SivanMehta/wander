import React from 'react'
import { render } from 'react-dom'

export default class Alert extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false
    }

  }

  render() {
    return this.state.show ? (
        <div className = { 'alert alert-' + (this.state.status ? 'success' : 'danger') }
             onClick = { (e) => { this.setState({show: false}) } }>
          <p> Your request to { this.state.to } was { this.state.status ? 'accepted!' : 'denied.' } </p>
        </div>
    ) : <span></span>
  }
}
