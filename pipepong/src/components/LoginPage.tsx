import React, { Component, ButtonHTMLAttributes } from 'react';
import { TwitterPicker, ColorResult} from 'react-color';


interface LoginPageProps {
    // properties this component recieves from parent here
    handleJoin?: (name:string, ballColor:string) => void;
    // handleJoin?: () => void;
}

interface LoginPageState {
    // any variables that can affect the UI (when updated should re-render)
    enteredUsername: string;
    ballColor: string;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            enteredUsername: "",
            ballColor: "#00FF00"
        };
        this.updateUsername = this.updateUsername.bind(this);
    }
    public render(){
        return (
            <div className = "LoginPage">
                <h1>
                    WELCOME TO PIPE PONG
                    {" " + this.state.enteredUsername.toUpperCase() + "!!!"}
                </h1>
                <button onClick={() => this.handleJoin()} style={{background:this.state.ballColor}}>
                Join Game
                </button>
                <input value = {this.state.enteredUsername} onChange = {this.updateUsername}/>
                {/* </input> */}
                <br/>
                <h4>
                Choose your color!
                </h4>
                <TwitterPicker color= {this.state.ballColor} onChange={(c)=>this.changeColor(c)} />

                <br/>
                <h3>
                    Rules
                </h3>
                <p>
                    Welcome! This is just like a regular game of Pong, just hit the ball back towards the right with your paddle
                    and stay in the game as long as possible.
                    <br/>
                    When a ball goes through a pipe it will go to the player listed on the pipe 
                    (So make sure to send lots to those high ranking players)
                    <br/>
                </p>
                    
                <h3>
                    Controls
                </h3>
                <p>
                    Move your paddle up with 'k' and down with 'j'.
                    <br/>
                   HAVE THE 'click here to play' SELECTED TO BE ABLE TO MOVE THE  PADDLE
                    <br/>
                </p>
            </div>
        )
    }
    handleJoin(){
        if(this.props.handleJoin !== undefined){
            this.props.handleJoin(this.state.enteredUsername, this.state.ballColor);
        }
    }
   
    updateUsername(username: React.ChangeEvent<HTMLInputElement>){
       this.setState({
            enteredUsername: username.target.value
       });
    }
    changeColor(color:ColorResult){
        this.setState({
            ballColor: color.hex
        })
    }
}

export default LoginPage;
