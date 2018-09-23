import React, {Component} from 'react';
import BadgeIcon from '../utils/BadgeIcon';
import {HashLoader} from 'react-spinners';
import constant from '../../constant';

class StateLogo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
        const { error, isLoaded, university} = this.state;
        if(this..includes("_")) {
            var tab = this.color.split("_")[0];
            if(tab==="blue") tab="green";
            return <HashLoader color={constant.bgColors[tab]} loading={this.state.loading}/>;
        }
        else if(this.color === "blue" || this.color==="SUCCESS")
            return <BadgeIcon color='green' icon='thumbs-up'/>;
        else if(this.color === "red" || this.color==="FAILURE")
            return <BadgeIcon color='red' icon='thumbs-down'/>;
        else
            return <BadgeIcon color='grey' icon='minus'/>;
    }
}

export default StateLogo;