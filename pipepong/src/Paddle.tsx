import React, { Component } from 'react';
const BouncyPadStyle : React.CSSProperties = {
    height: "100px",
    width: "10px"
};

class BouncyPad extends Component {
    render() {
        return(
            <div className = "bouncyPad" style = {BouncyPadStyle}>
            
            </div>
        )
    }
}