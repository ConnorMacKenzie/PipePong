import React, { Component } from 'react';

const SHAPEWIDTH = 40;

interface CLASSProps {
    minX : number;
    maxX : number;
    minY : number;
    maxY : number;
    dx : number;
    dy : number;
}

interface CLASSState {
    curX : number;
    curY : number;
    dx : number;
    dy : number;
    minX : number;
    maxX : number;
    minY : number;
    maxY : number;

}
class Ball extends React.Component<CLASSProps, CLASSState> {
  constructor(props : any) {
    super(props);
    this.state = {
      curX : 0,
      curY : 0,
      dx : props.dx,
      dy : props.dy,
      minX : props.minX,
      maxX : props.maxX - SHAPEWIDTH,
      minY : props.minY + SHAPEWIDTH,
      maxY : props.maxY,
    };
  }
  repositionBall() {
    this.setState({
        curX : this.state.curX + this.state.dx,
        curY : this.state.curY + this.state.dy,
        dx : (this.state.curX + this.state.dx > this.state.maxX || this.state.curX + this.state.dx < this.state.minX ? this.state.dx * -1 : this.state.dx),
        dy : (this.state.curY + this.state.dy > this.state.maxY || this.state.curY + this.state.dy < this.state.minY ? this.state.dy * -1 : this.state.dy)
    });
  }

  render() {
    let Ballstyle : React.CSSProperties = {
        position: "relative",
        bottom: ""+this.state.curY+"px",
        left: ""+this.state.curX+"px",
        display: "block"
    }
    return (
      <svg style={Ballstyle} height={"" + SHAPEWIDTH + "px"} width={"" + SHAPEWIDTH + "px"}>
        <circle cx={"" + SHAPEWIDTH/2 + "px"} cy={"" + SHAPEWIDTH/2 + "px"} r={"" + SHAPEWIDTH/2 + "px"} fill="pink" />
      </svg>
    );
  }
  componentDidMount(){
    setInterval(() => this.repositionBall() ,10);
  }
}

export default Ball;
