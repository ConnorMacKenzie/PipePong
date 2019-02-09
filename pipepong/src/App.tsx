import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pong from './components/Pong';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pong/>
      </div>
    );
  }
}

export default App;
