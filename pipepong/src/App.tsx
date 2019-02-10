import React, { Component } from 'react';
import './App.css';
import Pong from './components/Pong';
import Login from './components/LoginPage';
import CommHandler from './comms/CommHandler';
import {v4} from 'uuid'

interface CLASSProps {
}

interface CLASSState {
    joined: Boolean;
    name: string;
    color: string;
    uuid: string;
}

class App extends React.Component<CLASSProps, CLASSState> {
    commHandler:CommHandler;
    constructor(props: CLASSProps) {
        super(props);
        this.state = {
            joined: false,
            name: "",
            color: "#00FF00",
            uuid: "",
        }
        this.commHandler = new CommHandler();
        this.commHandler.connect();
    };


  join(name:string, color:string) {
    this.setState({
        joined: true,
        name:name,
        color: color,
        uuid: v4(),
    });
    this.commHandler.publishJoin(this.state.uuid,
                                 this.state.name,
                                 this.state.color)
  }

  render() {
      if(this.state.joined)
        return(<Pong/>);
      else
        return(<Login handleJoin={(name,color) => this.join(name,color)}/>);
  }
}

export default App;
