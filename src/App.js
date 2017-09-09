import React, { Component } from 'react';
import './App.css';
import Frame from './frame';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h1>Easy ABC</h1>
        </div>
        <Frame />
      </div>
    );
  }
}

export default App;
