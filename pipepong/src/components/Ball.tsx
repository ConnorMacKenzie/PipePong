import React, { Component } from 'react';

const SHAPEWIDTH = 40;

export interface BallProps {
    initialX : number;
    initialY : number;
    playerColor : string;
    velocity: number;
    angle: number;
    originatingPlayer: string; 
}

export interface BallState {
  curX: number;
  curY: number;
  dx: number;
  dy: number;
}
class Ball extends React.Component<BallProps, BallState> {
  constructor(props : BallProps) {
    super(props);
    this.state = {
      curX: props.initialX,
      curY: props.initialY,
      dx: Math.cos(props.angle) * props.velocity,
      dy: Math.sin(props.angle) * props.velocity
    };
  }

  render() {
    let Ballstyle : React.CSSProperties = {
        position: "relative",
        top: ""+this.state.curY+"px",
        left: ""+this.state.curX+"px",
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
  /**
   * bouces off a wall (changes direction)
   * @param vertical does the bounce vertically?
   * @param horizontal does the bounce horizontally? (direct bounce)
   */
  bounce(vertical:boolean = true, horizontal:boolean = false){
    if(vertical){
      this.setState({dy:-this.state.dy});
    }
    if(horizontal){
      this.setState({dx:-this.state.dx});
    }
  }
  /**
   * moves the ball by increment
   */
  updatePosition(){
    this.setState((prevState)=>{return {
      curX: prevState.curX + prevState.dx,
      curY: prevState.curY + prevState.dy
    }});
  }
  bounceOffPaddle(angle:number){
    this.setState({
      dx: Math.cos(angle) * this.props.velocity,
      dy: Math.sin(angle) * this.props.velocity
    })
  }
}

export default Ball;
