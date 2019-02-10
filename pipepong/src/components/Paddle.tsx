import React, { Component } from 'react';


interface CLASSProps {
    playHeight : number,
    distanceFromWall : number,
}

interface CLASSState {
}
class Paddle extends React.Component<CLASSProps, CLASSState> {
  constructor(props : any) {
    super(props);
    this.state = {
    };
}
    render() {
        let Paddlestyle : React.CSSProperties = {
            height: ""+this.props.playHeight/4+"px",
            width: "10px",
            background: "black",
            position: "relative",
            top: ""+this.props.playHeight/4+"px",
            left: ""+this.props.distanceFromWall+"px",
        }
        return(
            <div className = "paddle" style = {Paddlestyle}>
            </div>
        )
    }
}

export default Paddle;
