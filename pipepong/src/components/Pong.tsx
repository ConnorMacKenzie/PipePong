import React, { Component } from 'react';
import Ball from './Ball'
import Paddle from './Paddle'

const PLAYHEIGHT = 400;
const PLAYWIDTH = 800;
class Pong extends Component {
  render() {
    return (
        <div style={{height:""+PLAYHEIGHT+"px", width: ""+PLAYWIDTH+"px", border: "solid"}}>
           <Ball minX={0} maxX={PLAYWIDTH} minY={-PLAYHEIGHT} maxY={0} dx={4} dy={-4}/>
           <Paddle playHeight={PLAYHEIGHT} distanceFromWall={20}/>
    </div>
    );
  }
  componentDidMount(){
  }
}

export default Pong;
