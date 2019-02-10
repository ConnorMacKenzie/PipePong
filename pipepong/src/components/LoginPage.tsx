import React, { Component, ButtonHTMLAttributes } from 'react';

interface LoginPageProps {
    // properties this component recieves from parent here
}

interface LoginPageState {
    // any variables that can affect the UI (when updated should re-render)
    loggedIn: Boolean;
    enteredUsername: string;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            loggedIn: false,
            enteredUsername: ""
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
            </div>
        )
    }
    loginAction(){
        this.setState({
           loggedIn: true 
        })
    }
    updateUsername(username: React.ChangeEvent<HTMLInputElement>){
       this.setState({
            enteredUsername: username.target.value
       });
    }
}


export default LoginPage;