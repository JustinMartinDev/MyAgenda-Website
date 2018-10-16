import React, {Component} from 'react';
import {HashLoader} from 'react-spinners';
import BadgeIcon from "./BadgeIcon";
import reqObj from '../../../utils/RequestObject';

class StateLogo extends Component {
    constructor(props) {
        super(props);
        this.loginUrl = props.loginUrl;
        this.state = {
            loading: true,
            error: false
        }
    }

    hasBeenVerified = (url) =>{
        this.setState({
            loading: false,
            error: false
        });
    };
    notVerified = (url, error) => {
        this.setState({
            loading: false,
            error: true
        });
    };

    componentDidMount() {
        reqObj.checkUrlValidate(this.loginUrl, this);
    }

    render() {
        const {error, loading} = this.state;
        if(loading) {
           return <HashLoader color={'#000000'} loading={loading}/>;
        }
        else if(!error){
            return <BadgeIcon color='green' icon='thumbs-up'/>
        }
        else {
            return <BadgeIcon color='red' icon='thumbs-down'/>
        }
       // return <BadgeIcon color='grey' icon='minus'/>;
    }
}

export default StateLogo;
