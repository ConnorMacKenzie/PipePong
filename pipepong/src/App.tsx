import React, { Component } from 'react';
import './App.css';
import Pong from './components/Pong';
import Login from './components/LoginPage';

interface CLASSProps {
}

interface CLASSState {
    joined: Boolean;
}

class App extends React.Component<CLASSProps, CLASSState> {
    constructor(props: CLASSProps) {
        super(props);
        this.state = {
            joined: false,
            }
    };


  join() {
    this.setState({
        joined: true,
    });
  }

  render() {
      if(this.state.joined)
        return(<Pong/>);
      else
        return(<Login handleJoin={() => this.join()}/>);
  }
}

export default App;
