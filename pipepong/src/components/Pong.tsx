import React, { Component, isValidElement } from 'react';
import Ball from './Ball'
import Paddle from './Paddle'

const PLAYHEIGHT = 400;
const PLAYWIDTH = 800;
const SHAPEWIDTH = 40;

interface PongProps {
  height:number
  width:number
  leaderboard:Array<object>
  playerColor:string
}
interface PongState {
  paddleDistFromWall: number;
  curX : number;
  curY : number;
  dx : number;
  dy : number;
}
class Pong extends Component<PongProps, PongState> {
  fieldInput: HTMLInputElement | null = null;
  paddleRef: Paddle | null = null;
  constructor(props:PongProps){
    super(props);
    this.state = {
      paddleDistFromWall: 20,
      curX : 100,
      curY : 50,
      dx : 4,
      dy : -4
    };
  }


  repositionBall() {
    let curX = this.state.curX;
    let curY = this.state.curY;
    let nextX = curX + this.state.dx;
    let nextY = curY + this.state.dy;
    let hitPaddle = false;
    let dx = (hitPaddle || nextX + SHAPEWIDTH > PLAYWIDTH || nextX < 0 ? this.state.dx * -1 : this.state.dx);
    let dy = (hitPaddle || nextY + SHAPEWIDTH > PLAYHEIGHT || nextY < 0 ? this.state.dy * -1 : this.state.dy);
    if((nextY >= this.state.paddleDistFromWall && nextY <= this.state.paddleDistFromWall+PLAYHEIGHT/4) && (nextX <= 25)){
      if(this.paddleRef !== null){
        const velocity = Math.sqrt(dx*dx + dy*dy);
        hitPaddle = true;
        const newAngle = this.paddleRef.redirectBall(nextX,nextY);
        dx = Math.cos(newAngle) * velocity;
        dy = Math.sin(newAngle) * velocity;
      }
    }
    this.setState({
      curX : nextX,
      curY : nextY,
      dx : dx,
      dy : dy
  });
}


  render() {
    return (
        <div style={{height:""+this.props.height+"px", width: ""+this.props.width+"px", border: "solid"}}>
           <Ball curX={this.state.curX} curY={this.state.curY} playerColor={this.props.playerColor}/>
           <Paddle playHeight={PLAYHEIGHT} distanceFromWall={this.state.paddleDistFromWall} ref={ref=>this.paddleRef=ref}/>
    </div>
    );
  }
  componentDidMount(){
    if(this.fieldInput !== null){this.fieldInput.focus()}
    setInterval(() => this.repositionBall() ,10);
    document.addEventListener("keypress", (e)=>this.handleInput(e), false);
  }


  handleInput(e:any){
    let move = 0;
    if (e.key == "j" && this.state.paddleDistFromWall < PLAYHEIGHT*3/4){
      move = 20; // move down screen
    } else if (e.key == "k" && this.state.paddleDistFromWall >= 5) {
      move = -20; // move up screen
    }
    this.setState({
      paddleDistFromWall: this.state.paddleDistFromWall + move
    })
  }
}

export default Pong;
