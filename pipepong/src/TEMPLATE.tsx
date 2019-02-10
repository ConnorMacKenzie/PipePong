import React, { Component } from 'react';

interface CLASSProps {
    // properties this component recieves from parent here
}

interface CLASSState {
    // any variables that can affect the UI (when updated should re-render)

}

class CLASS extends React.Component<CLASSProps, CLASSState> {
    public render(){
        return (
            <div className = "CLASS">
                {/* stuff here */}
            </div>
        )
    }
}


export default CLASS;