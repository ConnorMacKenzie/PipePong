import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'

const PIPE_WIDTH = 100;


class Pipe extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Fragment>
                <tr width={this.props.width} 
                        height={this.props.height} 
                        y={this.props.y}
                        >
                    <td
                        style={{
                        backgroundColor: this.props.color,
                        borderLeftColor: this.props.color,
                        border: "15px solid",
                        borderTopColor: "white",
                        borderBottomColor: "white",
                        borderRightColor: "white",
                        }}>
                        {this.props.name}
                    </td>
                </tr>
            </Fragment>
        );
    }
}
Pipe.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string,
    sessionId: PropTypes.int,
};

export default Pipe;