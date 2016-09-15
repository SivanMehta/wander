import React from 'react';
import { render } from 'react-dom';

export default class Map extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
        <h1>Users:</h1>
        { JSON.stringify(this.props.users) }
      </div>
    );
  }
}
