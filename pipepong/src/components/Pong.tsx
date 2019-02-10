import React, { Component } from 'react';
import Ball from './Ball'

class Pong extends Component {
  render() {
    return (
      <div className="pong">
        <div style={{height:"400px", width: "727px", border: "solid"}}>
        <Ball minX={0} maxX={727} minY={-400} maxY={0} dx={4} dy={-4}/>
        </div>
      </div>
    );
  }
  componentDidMount(){
  }
}

export default Pong;
