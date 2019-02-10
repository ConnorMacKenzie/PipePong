import React, { Component } from 'react';
import './App.css';
import Pong from './components/Pong';
import Login from './components/LoginPage';

interface CLASSProps {
}

interface CLASSState {
    joined: Boolean;
    name: string;
    color: string;
}

class App extends React.Component<CLASSProps, CLASSState> {
    constructor(props: CLASSProps) {
        super(props);
        this.state = {
            joined: false,
            name: "",
            color: "#00FF00"
        }
    };


  join(name:string, color:string) {
    this.setState({
        joined: true,
        name:name,
        color: color
    });
  }

  render() {
      if(this.state.joined)
        return(<Pong/>);
      else
        return(<Login handleJoin={(name,color) => this.join(name,color)}/>);
  }
}

export default App;
