import React, { Component } from 'react';

const DIST_FROM_HORIZONTAL_WALL = 20;
interface CLASSProps {
    playHeight : number,
    /* the distance from VERTICAL wall */
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
            top: ""+this.props.distanceFromWall+"px",
            left: ""+DIST_FROM_HORIZONTAL_WALL+"px",
        }
        return(
            <div className = "paddle" style = {Paddlestyle}>
            </div>
        )
    }
}

export default Paddle;
