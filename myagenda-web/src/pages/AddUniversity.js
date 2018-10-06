import React, { Component } from 'react';

class AddUniversity extends Component {
    constructor(props) {
        super(props);
        this.universityData = this.props.location.state;
        this.state = {
            step: 0;
        };
    }
    render() {
        console.log(this.props.location.state);
        return (
            <h1>lel</h1>
        );
    }
}

export default AddUniversity;
