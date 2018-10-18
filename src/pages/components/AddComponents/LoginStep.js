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

class LoginStep extends Component{
    constructor(props){
        super(props);
        this.state = {
            errorMessage: "no message",
            error: false,
            loading: false
        };
        this.data = {
            "url": this.props.url,
            "identifiant": this.props.identifiant,
            "password": this.props.password
        };
    }

    login = () => {
        event.preventDefault();
        let url = document.getElementById("idUrl2").value;
        this.setState({
            errorMessage: "no message",
            error: false,
            loading: true,
            url: url
        });
        let params = {
            "username" : document.getElementById("idIdentifiant").value,
            "password" : document.getElementById("idPassword").value
        };

        myAgendaAPI.loginCAS(url, params, (result) => {
           if(result.hasOwnProperty("error"))
               this.htmlError(result.message);
           else
               this.htmlLoaded(url, result);
        });
    };

    htmlLoaded = (url, body) =>{
       /* let html = response.body;
        let header = response.header;*/

        let ltInput = html.getElementsByName("lt")[0];
        var lt = "";
        if (ltInput.value!=="")
            lt = ltInput.value;

        let executionInput = html.getElementsByName("execution");
        var execution = "e1s1";
        if (executionInput.length!==0)
            execution = executionInput[0].value;

        const params = {
            "_eventId": "submit",
            "lt": lt,
            "submit": "LOGIN",
            "username" : document.getElementById("idIdentifiant").value,
            "password" : document.getElementById("idPassword").value,
            "execution": execution
        };
        //reqObj.login(url, params);
    };
    htmlError = (error) => {
        this.data = {
            "url": this.props.url,
            "identifiant": this.props.identifiant,
            "password": ""
        };
        this.setState({
            errorMessage: error,
            error: true,
            loading: false,
        });
    };

    hasBeenLoged = () =>{
        this.setState({
            errorMessage: "no message",
            error: false,
            loading: false,
        });
        this.props.handleNext();
    };
    notLoged = (error) => {
        this.data = {
            "url": this.props.url,
            "identifiant": this.props.identifiant,
            "password": ""
        };
        this.setState({
            errorMessage: error,
            error: true,
            loading: false,
        });
    };

    render(){
        const {errorMessage ,error, loading} = this.state;
        if(!error) {
            return (<LoginStepForm loading={loading} login={this.login} data={this.data}/>);
        }
        else {
            return (
                <React.Fragment>
                    <BoxMessage message={errorMessage} classColor="red lighten-1"/>
                    <LoginStepForm url="" loading={loading} login={this.verify} data={this.data}/>
                </React.Fragment>
            );
        }
    }
}

function LoginStepForm(props) {
    return(
        <Container>
            <Row>
                <form onSubmit={props.login}>
                    <p className="h5 text-center mb-4">Vérification de des login</p>
                    <div className="grey-text">
                        <div className="md-form form-group">
                            <i className="fa fa-globe active prefix"/>
                            <input type="url" required id="idUrl2" className="form-control validate" defaultValue={props.data.url}/>
                            <label className="active" htmlFor="idUrl" data-error="wrong" data-success="right">URL ENT</label>
                        </div>
                        <div className="md-form form-group">
                            <i className="fa fa-user active prefix"/>
                            <input type="text" required id="idIdentifiant" className="form-control validate" defaultValue={props.data.identifiant}/>
                            <label className="active" htmlFor="idIdentifiant" data-error="wrong" data-success="right">Identifiant ENT</label>
                        </div>
                        <div className="md-form form-group">
                            <i className="fa fa-lock active prefix"/>
                            <input type="password" required id="idPassword" className="form-control validate" defaultValue={props.data.password}/>
                            <label className="active" htmlFor="idPassword" data-error="wrong" data-success="right">Mot de passe ENT</label>
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
export default LoginStep;