import React, { Component } from 'react';
import './App.css';
import Pong from './components/Pong';
import Login from './components/LoginPage';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Login/>
        <Pong/>
      </div>
    );
  }
}

export default App;
