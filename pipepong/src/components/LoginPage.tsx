import React, { Component, ButtonHTMLAttributes } from 'react';
import * as picker from 'react-color';


interface LoginPageProps {
    // properties this component recieves from parent here
    loginAction?: (name:string, color:string) => void;
}

interface LoginPageState {
    // any variables that can affect the UI (when updated should re-render)
    loggedIn: Boolean;
    enteredUsername: string;
    color: string;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            loggedIn: false,
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
                <button onClick={() => this.loginAction()}>
                Join Game
                </button>
                <input value = {this.state.enteredUsername} onChange = {this.updateUsername}/>
                {/* </input> */}
                <br/>
                <picker.TwitterPicker color= {this.state.color} onChange={(c)=>this.changeColor(c)} />
            </div>
        )
    }
    loginAction(){
        if(this.props.loginAction !== undefined){
            this.props.loginAction(this.state.enteredUsername, "red");
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
