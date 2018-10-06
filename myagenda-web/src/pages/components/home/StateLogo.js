import React, {Component} from 'react';
import {HashLoader} from 'react-spinners';
import BadgeIcon from "./BadgeIcon";

class StateLogo extends Component {
    constructor(props) {
        super(props);
        this.loginUrl = props.loginUrl;
        this.state = {
            loading: true,
            error: null
        }
    }

    componentDidMount() {
        fetch(this.loginUrl)
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        loading: false,
                        error: false
                    })
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in pages.
                (error) => {
                    this.setState({
                        loading: false,
                        error: true,
                    });
                });
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
            return <BadgeIcon error={error} color='red' icon='thumbs-down'/>
        }
       // return <BadgeIcon color='grey' icon='minus'/>;
    }
}

export default StateLogo;
