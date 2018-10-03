import React, {Component} from 'react';
import {HashLoader} from 'react-spinners';

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
                // exceptions from actual bugs in components.
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
           return <HashLoader color={'#fffa07'} loading={this.state.loading}/>;
        }
        else if(!error){
            return <HashLoader color={'#00bc03'} loading={false}/>;
        }
        else {
            return <HashLoader color={'#c0392b'} loading={false}/>;
        }
       // return <BadgeIcon color='grey' icon='minus'/>;
    }
}

export default StateLogo;