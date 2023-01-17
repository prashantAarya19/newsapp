import './App.css';

import React, { Component } from 'react'

export default class App extends Component {
  name = 'Prashant';
  render() {
    return (
      <div>
        First Class Based Component {this.name}
      </div>
    )
  }
}

