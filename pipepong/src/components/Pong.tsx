import React, { Component, isValidElement } from 'react';
import Ball, {BallProps} from './Ball'
import Paddle from './Paddle'

const PLAYHEIGHT = 400;
const PLAYWIDTH = 800;
const SHAPEWIDTH = 40;

interface PongProps {
  height:number,
  width:number,
  leaderboard:Array<object>,
  playerColor:string
  loseCallback:Function
  sendBallCallBack:Function
}
interface PongState {
  paddleDistFromWall: number;
  balls: BallProps[];
}
class Pong extends Component<PongProps, PongState> {
  fieldInput: HTMLInputElement | null = null;
  paddleRef: Paddle | null = null;
  updaterID: any;
  constructor(props:PongProps){
    super(props);
    this.state = {
      paddleDistFromWall: 20,
      balls: [
        {
          initialX : 500,
          initialY : 100,
          playerColor : "#FF0000",
          velocity: 5,
          angle: -2,
          originatingPlayer: "me"

        }
      ]
    };
  }


  repositionBalls() {
    for(let idx=0;idx<this.state.balls.length; idx++){
      let ball = (this.refs[this.state.balls[idx].originatingPlayer] as Ball);
      
      // nextX + SHAPEWIDTH > PLAYWIDTH || nextX < 0 ? this.state.dx * -1 : this.state.dx);
      if(ball.state.curY + SHAPEWIDTH > PLAYHEIGHT || ball.state.curY < 0 ){
        ball.bounce();
      }
      if((ball.state.curY >= this.state.paddleDistFromWall && ball.state.curY <= this.state.paddleDistFromWall+PLAYHEIGHT/4) && (ball.state.curX <= 25)){
        if(this.paddleRef !== null){
          const newAngle = this.paddleRef.redirectBall(ball.state.curX, ball.state.curY);
          ball.bounceOffPaddle(newAngle);
        }
      }
      ball.updatePosition();
    }
}

  render() {
    return (
        <div style={{height:""+this.props.height+"px", width: ""+this.props.width+"px", border: "solid", position : "relative", top: "0px"}}>
           {this.state.balls.map((elem) => <Ball key={elem.originatingPlayer} {...elem} ref={elem.originatingPlayer}/>)}
           <Paddle playHeight={PLAYHEIGHT} distanceFromWall={this.state.paddleDistFromWall} ref={ref=>this.paddleRef=ref}/>
    </div>
    );
  }
  componentDidMount(){
    if(this.fieldInput !== null){this.fieldInput.focus()}
    this.updaterID = setInterval(() => this.repositionBalls() ,10);
    document.addEventListener("keypress", (e)=>this.handleInput(e), false);
  }
  componentWillUnmount(){
    clearInterval(this.updaterID);
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
