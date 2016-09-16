import React from 'react'
import { render } from 'react-dom'

export default class ListView extends React.Component {
  constructor(props) {
    super(props)
  }

  renderUsers(role) {
    var result = []
    this.props.users[role] ? this.props.users[role].forEach((user) => {
      result.push(
        <li className="list-group-item">
          lat: {user.lat}, lng: {user.lng}
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
