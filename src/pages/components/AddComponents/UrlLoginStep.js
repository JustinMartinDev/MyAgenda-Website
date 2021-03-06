import React, { Component } from 'react';
import {Row, Container} from 'mdbreact';
import {ClimbingBoxLoader} from 'react-spinners';
import { css } from 'react-emotion';
import BoxMessage from '../utils/BoxMessage'
import myAgendaAPI from "../../../utils/MyAgenda-API";


const override = css`
    position: relative;
    margin: auto;
`;

class UrlLoginStep extends Component{
    constructor(props){
        super(props);
        this.state = {
            errorMessage: "no message",
            error: false,
            loading: false,
            url: this.props.url
        };
    }

    verify = (event) => {
        event.preventDefault();
        this.setState({
            errorMessage: "no message",
            error: false,
            loading: true,
            url: url
        });
        let url = document.getElementById("idUrl").value;
        myAgendaAPI.redirectURL(url, (result) => {
            console.log(result);
            if (result.hasOwnProperty("error"))
                this.notVerified(url, result.message);
            else
                this.hasBeenVerified(url);
        });
    };

    hasBeenVerified = (url) =>{
        this.setState({
            errorMessage: "no message",
            error: false,
            loading: false,
            url: url
        });
        this.props.saveUrl(url);
        this.props.handleNext();
    };
    notVerified = (url, error) => {
        this.setState({
            errorMessage: error,
            error: true,
            loading: false,
            url: url
        });
    };

    render(){
        const {errorMessage ,error, loading, url} = this.state;
        if(!error) {
            return (
                <LoginStepForm loading={loading} verify={this.verify} url={url}/>
            );
        }
        else {
            return (
                <React.Fragment>
                    <BoxMessage message={errorMessage} classColor="red lighten-1"/>
                    <LoginStepForm url="" loading={loading} verify={this.verify}/>
                </React.Fragment>
            );
        }
    }
}

function LoginStepForm(props) {
    return(
        <Container>
            <Row>
                <form onSubmit={props.verify}>
                    <p className="h5 text-center mb-4">Vérification de l'url de login</p>
                    <div className="grey-text">
                        <div className="md-form form-group">
                            <i className="fa fa-globe active prefix"/>
                            <input type="url" required id="idUrl" className="form-control validate" defaultValue={props.url}/>
                            <label className="active" htmlFor="idUrl" data-error="wrong" data-success="right">URL login</label>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn red-color">Vérifier</button>
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
export default UrlLoginStep;