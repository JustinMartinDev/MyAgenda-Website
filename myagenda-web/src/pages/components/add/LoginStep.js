import React, { Component } from 'react';
import Button from 'mdbreact';

class LoginStep extends Component{
    render(){
        return(
            <React.Fragment>
                <h1 onClick={this.props.handleNext}>LoginStep</h1>
            </React.Fragment>
        );
    }
}
export default LoginStep;