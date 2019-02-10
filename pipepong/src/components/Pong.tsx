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
  needToUpdate: boolean;
}
class Pong extends Component<PongProps, PongState> {
  fieldInput: HTMLInputElement | null = null;
  paddleRef: Paddle | null = null;
  updaterID: any;
  constructor(props:PongProps){
    super(props);
    this.state = {
      needToUpdate: false,
      paddleDistFromWall: 20,
      balls: [
        {
          initialX : 500,
          initialY : 100,
          playerColor : this.props.playerColor,
          velocity: 5,
          angle: -2,
          originatingPlayer: "me"
        }
      ]
    };
  }

  addBall(initialX:number, initialY:number, playerColor:string, velocity:number, angle:number, originatingPlayer:string){
    var balls = this.state.balls.slice()
    var newBall:BallProps= {
      initialX : initialX,
      initialY : initialY,
      playerColor : playerColor,
      velocity: velocity,
      angle: angle,
      originatingPlayer: originatingPlayer,
    }
    console.log("newball was pushed to the list")
    balls.push(newBall);
    this.setState({
      balls: balls
    })
  }

  repositionBalls() {
    const nextBalls: BallProps[] = [];
    const balls = this.state.balls;
    for(let idx=0;idx<balls.length; idx++){
      console.log("NUMBER OF BALLS LOOP: " + balls.length);
      let ball = (this.refs[balls[idx].originatingPlayer] as Ball);
      if(!ball || ball.wasDestroyed){
        continue;
      }
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
      if(ball.state.curX <= 1){
        this.props.loseCallback("Lost", "We're not sure yet");
      } else if(ball.state.curX >= PLAYWIDTH - 30){
        this.props.sendBallCallBack(ball.state.curY);
        ball.wasDestroyed = true;
        balls.splice(idx, 1);
        idx -= 1;
        console.log("NUMBER OF BALLS NOW!! ",balls.length);
      } else {
        ball.updatePosition();
        nextBalls.push(balls[idx]);
      }
    }
    this.setState({
      balls:nextBalls,
      needToUpdate: true
    })
}

  render() {
    return (
        <div style={{height:""+this.props.height+"px", width: ""+this.props.width+"px", border: "solid", position : "relative", top: "0px"}}>
           {this.state.balls.map((elem) => <Ball key={elem.originatingPlayer} {...elem} ref={elem.originatingPlayer}/>)}
           <Paddle playHeight={PLAYHEIGHT} distanceFromWall={this.state.paddleDistFromWall} color={this.props.playerColor} ref={ref=>this.paddleRef=ref}/>
           {this.state.balls.length}
    </div>
    );
  }
  componentDidMount(){
    if(this.fieldInput !== null){this.fieldInput.focus()}
    //this.updaterID = setInterval(() => this.repositionBalls() ,10);
    document.addEventListener("keypress", (e)=>this.handleInput(e), false);
    this.setState({needToUpdate:true});
  }
  componentWillUnmount(){
    //clearInterval(this.updaterID);
  }
  componentDidUpdate(prevProps:PongProps, prevState:PongState){
    if(this.state.needToUpdate && !prevState.needToUpdate){
      setTimeout(() => this.repositionBalls() ,10);
      this.setState({needToUpdate:false});
    }
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
