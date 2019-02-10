import React, { Component } from 'react';
import Ball from './Ball'
import Paddle from './Paddle'

const PLAYHEIGHT = 400;
const PLAYWIDTH = 800;
const SHAPEWIDTH = 40;

interface PongProps {

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
  constructor(props:PongProps){
    super(props);
    this.state = {
      paddleDistFromWall: 20,
      curX : 0,
      curY : 0,
      dx : 4,
      dy : -4,
    };
  }


  repositionBall() {
      this.setState({
          curX : this.state.curX + this.state.dx,
          curY : this.state.curY + this.state.dy,
        dx : (this.state.curX + this.state.dx + SHAPEWIDTH > PLAYWIDTH || this.state.curX + this.state.dx < 0 ? this.state.dx * -1 : this.state.dx),
        dy : (this.state.curY + this.state.dy + SHAPEWIDTH > PLAYHEIGHT || this.state.curY + this.state.dy < 0 ? this.state.dy * -1 : this.state.dy)
  });
}


  render() {
    return (
        <div style={{height:""+PLAYHEIGHT+"px", width: ""+PLAYWIDTH+"px", border: "solid"}}>
           <Ball curX={this.state.curX} curY={this.state.curY}/>
           <Paddle playHeight={PLAYHEIGHT} distanceFromWall={this.state.paddleDistFromWall}/>
           <input
              ref={(input => this.fieldInput=input)}
              type="text"
              placeholder="click here to play"
              value=""
              // onKeyPress = {(e)=>this.handleInput(e)}
              onChange = {(e)=>this.handleInput(e)}
            ></input>
    </div>
    );
  }
  componentDidMount(){
    if(this.fieldInput !== null){this.fieldInput.focus()}
    setInterval(() => this.repositionBall() ,10);
  }
  handleInput(e:React.ChangeEvent<HTMLInputElement>){
    let move = 0;
    if (e.target.value == "j"){
      move = 5; // move down screen
    } else if (e.target.value == "k") {
      move = -5; // move up screen
    }
    this.setState({
      paddleDistFromWall: this.state.paddleDistFromWall + move
    })
  }
}

export default Pong;
