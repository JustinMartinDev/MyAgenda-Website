import React, { Component } from 'react';
import {Row, Container} from 'mdbreact';
import {ClimbingBoxLoader} from 'react-spinners';
import { css } from 'react-emotion';
import axios from 'axios';

import "../../utils.js";
import BoxMessage from "../../utils";

const override = css`
    position: relative;
    margin: auto;
`;

class LoginStep extends Component{
    constructor(props){
        super(props);
        this.state = {
            errorMessage: "no message",
            error: false,
            startScript: false,
            url: this.props.url
        };
    }

    verify = () => {
        var url = document.getElementById("idUrl").value;
        this.setState({
            errorMessage: "no message",
            error: false,
            startScript: true,
            url: url
        });
        if(url.includes("http")) {
            axios({
                method:'get',
                url:url,
                responseType:'document'
            })
            .then(function (response) {
                console.log(response);
            });
            /*fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'text/html,application/xhtml+xml,application/xml'
                    }
                })
                .then(
                    (result) => {
                        console.log(result);
                        this.setState({
                            errorMessage: "no message",
                            error: false,
                            startScript: false,
                            url: url
                        });
                        this.props.handleNext();
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in pages.
                    (error) => {
                        console.log("error : " + error);
                        /*this.setState({
                            errorMessage: error,
                            error: true,
                            startScript: false
                        });
                    });*/
        }else{
            this.setState({
                errorMessage: "URL non valide   ",
                error: true,
                startScript: false,
                url: ""
            });
        }
    };

    render(){
        const {errorMessage ,error, startScript, url} = this.state;
        if(!error) {
            return (
                <LoginStepForm loading={startScript} verify={this.verify} url={url}/>
            );
        }
        else {
            return (
                <React.Fragment>
                    <BoxMessage message={errorMessage} classColor="red lighten-1"/>
                    <LoginStepForm url="" loading={startScript} verify={this.verify}/>
                </React.Fragment>
            );
        }
    }
}
function LoginStepForm(props) {
    return(
        <Container>
            <Row>
                <form>
                    <p className="h5 text-center mb-4">Vérification de l'url de login</p>
                    <div className="grey-text">
                        <div className="md-form form-group">
                            <i className="fa fa-globe active prefix"/>
                            <input type="url" required id="idUrl" className="form-control validate" defaultValue={props.url}/>
                            <label className="active" htmlFor="idUrl" data-error="wrong" data-success="right">URL login</label>
                        </div>
                    </div>
                    <div className="text-center">
                        <button onClick={props.verify} type="button" className="btn red-color">Vérifier</button>
                    </div>
                    <div className='sweet-loading text-center'>
                        <ClimbingBoxLoader
                            className={override}
                            sizeUnit={"px"}
                            size={12}
                            color={'#c0392b'}
                            loading={props.loading}/>
                    </div>
                </form>
            </Row>
        </Container>);
}
export default LoginStep;