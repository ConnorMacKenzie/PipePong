import React, { Component } from 'react';

const SHAPEWIDTH = 40;

interface CLASSProps {
    curX : number;
    curY : number;
    playerColor : string
}

interface CLASSState {
}
class Ball extends React.Component<CLASSProps, CLASSState> {
  constructor(props : any) {
    super(props);
    this.state = {
    };
  }

  render() {
    let Ballstyle : React.CSSProperties = {
        position: "relative",
        top: ""+this.props.curY+"px",
        left: ""+this.props.curX+"px",
        display: "block"
    }
    return (
      <svg style={Ballstyle} height={"" + SHAPEWIDTH + "px"} width={"" + SHAPEWIDTH + "px"}>
        <circle 
          cx={"" + SHAPEWIDTH/2 + "px"} 
          cy={"" + SHAPEWIDTH/2 + "px"} 
          r={"" + SHAPEWIDTH/2 + "px"} 
          fill={this.props.playerColor}
        />
      </svg>
    );
  }
}

export default Ball;
