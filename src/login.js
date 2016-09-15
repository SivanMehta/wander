import React from 'react'
import { render } from 'react-dom'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id = "welcome">
        <h1>Connect As: </h1>
        <div className="btn-group" role = "group">
        <button type="button" className = "btn btn-default" id = "tbutton" onClick = { this.props.connect }>Tourist</button>
        <button type="button" className = "btn btn-default" id = "gbutton" onClick = { this.props.connect }>Guide</button>
        </div>
      </div>
    )
  }
}
