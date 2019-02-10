import React, { Component, Fragment } from 'react';
import Pipe from './Pipe';
import PropTypes from 'prop-types'


class Leaderboard extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <table height={this.props.height} width={this.props.width} x={this.props.x} y={this.props.y}>
                {this.props.leaderboard.map((player)=>{
                    return <Pipe height={player.height} 
                        sessionId={player.sessionId} 
                        name={player.name} 
                        color={player.color} 
                        width={this.props.width} 
                        y={player.y}/>
                })}
            </table>
        );
    }
}

Leaderboard.propTypes ={
    height: PropTypes.number,
    leaderboard: PropTypes.array
}

export default Leaderboard;