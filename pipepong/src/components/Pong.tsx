import React, { Component } from 'react';

class Pong extends Component {
  ctx?: CanvasRenderingContext2D;
  render() {
    return (
      <div className="pong">
        <canvas id="myCanvas" ref="myCanvas" width="480" height="320"></canvas>
      </div>
    );
  }
  componentDidMount(){
    const ctx = (this.refs.myCanvas as HTMLCanvasElement).getContext("2d");
    if(ctx !== null){
        this.ctx = (ctx as CanvasRenderingContext2D);
    } else {
        throw "NO CONTEXT";
    }
    this.ctx.beginPath();
    this.ctx.moveTo(100, 100);
    this.ctx.lineTo(100, 200);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

export default Pong;
