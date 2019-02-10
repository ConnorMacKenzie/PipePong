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
            position: "absolute",
            top: ""+this.props.distanceFromWall+"px",
            left: ""+DIST_FROM_HORIZONTAL_WALL+"px",
        }
        return(
            <div className = "paddle" style = {Paddlestyle}>
            </div>
        )
    }
    /**
     *
     * @param ballx x position of ball
     * @param bally y position of ball
     * @returns new direction of ball in radians relative to positive x axis
     */
    redirectBall(ballx:number, bally:number){
        const cy = this.props.distanceFromWall + this.props.playHeight/8; //center of paddle y
        const cx = DIST_FROM_HORIZONTAL_WALL+10; //center of paddle x
        const dy = bally - cy; //distance y that ball is from paddle center
        const dx = bally - cx; // distance x that ball is from paddle center
        return Math.atan2(dy,dx);
    }
}

export default Paddle;
