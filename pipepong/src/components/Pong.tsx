import React, { Component } from 'react';
import Ball from './Ball'
import Paddle from './Paddle'

const PLAYHEIGHT = 400;
const PLAYWIDTH = 800;

interface PongProps {
  height:number,
  width:number,
  leaderboard:Array<object>
}
interface PongState {
  paddleDistFromWall: number;
}
class Pong extends Component<PongProps, PongState> {
  fieldInput: HTMLInputElement | null = null;
  constructor(props:PongProps){
    super(props);
    this.state = {
      paddleDistFromWall: 20
    };
  }
  render() {
    return (
        <div style={{height:""+this.props.height+"px", width: ""+this.props.width+"px", border: "solid"}}>
           <Ball minX={0} maxX={PLAYWIDTH} minY={-PLAYHEIGHT} maxY={0} dx={4} dy={-4}/>
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
