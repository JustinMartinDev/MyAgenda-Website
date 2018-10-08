import {Component} from "react";
import React from "react";
import {Card, CardBody} from 'mdbreact';

class BoxMessage extends Component{
    constructor(props){
        super(props);
        this.message = props.message;
        this.color = props.classColor;
    }

    render(){
        return(
            <Card color={this.color} text="white" className="text-center">
                <CardBody>
                    {this.message}
                </CardBody>
            </Card>
        );
    }
}

export default BoxMessage;