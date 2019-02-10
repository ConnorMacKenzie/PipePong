import React, { Component } from 'react';
import './App.css';
import Pong from './components/Pong';
import Login from './components/LoginPage';
import CommHandler from './comms/CommHandler';
import {v4} from 'uuid'
import {processLeaderBoardList} from './tools/LeaderboardProcessor'
import Leaderboard from './components/Leaderboard';

const PONG_HEIGHT:number = 400;
const PONG_WIDTH:number= 800;

interface CLASSProps {
}

interface CLASSState {
    joined: Boolean;
    name: string;
    color: string;
    sessionId: string;
    leaderboard: Array<object>;
}

interface JoinMessage {
  sessionId:string;
  name:string;
  color:string;
}
interface LeaderBoardMessage {
  leaderboard:Array<object>;
}
interface LeaveMessage {
  sessionId:string;
  reason:string;
  killedBy:string;
}
interface BallMessage {
  sessionId:string;
  targetSessionId:string;
  velocity:number;
  angle:number;
}

class App extends React.Component<CLASSProps, CLASSState> {
    commHandler:CommHandler;
    constructor(props: CLASSProps) {
        super(props);
        this.state = {
            joined: false,
            name: "",
            color: "#00FF00",
            sessionId: "",
            leaderboard: [],
        }
        this.leaderboardCallBack = this.leaderboardCallBack.bind(this);
        this.commHandler = new CommHandler(this.joinCallBack, this.ballCallBack, this.leaveCallBack, this.leaderboardCallBack);
        this.commHandler.connect();
    };


  join(name:string, color:string) {
    this.setState({
        joined: true,
        name:name,
        color: color,
        sessionId: v4(),
    });
    this.commHandler.publishJoin(this.state.sessionId,
                                 this.state.name,
                                 this.state.color)
  }
  leaderboardCallBack(message:LeaderBoardMessage){
    var leaderboard = message.leaderboard;
    processLeaderBoardList(leaderboard, PONG_HEIGHT);
    this.setState({
      leaderboard: leaderboard
    })
  }
  joinCallBack(message:JoinMessage){
    console.log("Join Callback", message);
  }
  leaveCallBack(message:LeaveMessage){
    console.log("Leave Callback", message);
  }
  ballCallBack(message:BallMessage){
    if (this.state.sessionId == message.targetSessionId){
      this.generateBall(message.velocity, message.angle, message.sessionId);
    }
  }

  generateBall(velocity:number, angle:number, source:string){
    console.log("A ball was made with\nvelocity: " + velocity + "\nangle: " + angle)
  }

  render() {
      if(this.state.joined)
        return(
          <table>
            <tr>
              <td>
                <Pong height={PONG_HEIGHT} width={PONG_WIDTH} leaderboard={this.state.leaderboard}/>
              </td>
              <td>
                <Leaderboard leaderboard={this.state.leaderboard} height={PONG_HEIGHT} width={PONG_WIDTH/10} x={9*PONG_WIDTH/10} y="0"/>
              </td>
            </tr>
          </table>
        );
      else
        return(<Login handleJoin={(name,color) => this.join(name,color)}/>);
  }
}


export default App;
