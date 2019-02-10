import React, { Component, ButtonHTMLAttributes } from 'react';
import * as picker from 'react-color';


interface LoginPageProps {
    // properties this component recieves from parent here
    // loginAction?: (name:string, color:string) => void;
    handleJoin?: (name:string, color:string) => void;
}

interface LoginPageState {
    // any variables that can affect the UI (when updated should re-render)
    enteredUsername: string;
    color: string;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            enteredUsername: "",
            color: "#00FF00"
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
                <button onClick={() => this.handleJoin()} style={{background:this.state.color}}>
                Join Game
                </button>
                <input value = {this.state.enteredUsername} onChange = {this.updateUsername}/>
                {/* </input> */}
                <br/>
                <h4>
                Choose your color!
                </h4>
                <picker.TwitterPicker color= {this.state.color} onChange={(c)=>this.changeColor(c)} />
                <br/>
                <h3>
                    Rules
                </h3>
                <p>
                    Welcome! This is just like a regular game of Pong, just hit the ball back towards the right with your paddle
                    and stay in the game as long as possible.
                    
                    <br/>
                    <br/>
                    Move your paddle up with 'k' and down with 'j'.
                    <br/>
                    D'ONT CLICK THE SCREEN OR ELSE YOU MIGHT BRAKE THE PADDLE AND HAVE TO RESTART
                    <br/>
                </p>
            </div>
        )
    }
    handleJoin(){
        if(this.props.handleJoin !== undefined){
            this.props.handleJoin(this.state.enteredUsername, this.state.color);
        }
    }
   
    updateUsername(username: React.ChangeEvent<HTMLInputElement>){
       this.setState({
            enteredUsername: username.target.value
       });
    }
    changeColor(color:picker.ColorResult){
        this.setState({
            color: color.hex
        })
    }
}

export default LoginPage;
