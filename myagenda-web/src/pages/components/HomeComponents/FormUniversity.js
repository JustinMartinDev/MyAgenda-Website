import React, {Component} from 'react';
import {withRouter} from 'react-router';

import Fab from '@material/react-fab/dist';
import 'material-design-icons/iconfont/material-icons.css';
import '@material/react-fab/dist/fab.css';

import {Input, Button, Fa, Modal, ModalBody, ModalFooter} from 'mdbreact';

class FormUniversity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.goToViewAddPage = this.goToViewAddPage.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    goToViewAddPage() {
        const params = {
            name: document.getElementById("name-univ").value,
            loginUrl: document.getElementById("url-login").value,
            agendaUrl: document.getElementById("url-agenda").value,
            idEnt: document.getElementById("ent-id").value,
            passwordEnt: document.getElementById("ent-password").value
        };
        this.props.history.push('/AddUniversity/'+params.name, params);
    }
    render() {
            return(
                <React.Fragment>
                    <Fab onClick={this.toggle} className="fab-fixed-right" icon={<i className="material-icons">add</i>}/>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="cascading-modal">
                        <div className="modal-header red-color white-text">
                            <h4 className="title">
                                <Fa className="fa fa-university" /> Ajouter une université</h4>
                            <button type="button" className="close" onClick={this.toggle}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <ModalBody className="grey-text">
                            <Input size="sm" id="name-univ" label="Nom de l'université" icon="university" group type="text" validate error="wrong" success="right"/>
                            <Input size="sm" id="url-login" label="URL de connexion ENT" icon="globe" group type="url" validate error="wrong" success="right"/>
                            <Input size="sm" id="url-agenda" label="URL de l'agenda" icon="globe" group type="url" validate error="wrong" success="right"/>
                            <Input size="sm" id="ent-id" label="Identifiant ENT" icon="user" group type="text" validate error="wrong" success="right"/>
                            <Input size="sm" id="ent-password" label="Mot de passe ENT" icon="lock" group type="password" validate error="wrong" success="right"/>
                            <p>La procédure d'ajout peut prendre un peu de temps</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="red-color" onClick={this.goToViewAddPage} color="">Ajouter</Button>
                        </ModalFooter>
                    </Modal>
                </React.Fragment>
            );
    }
}

export default withRouter(FormUniversity);
