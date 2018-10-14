import React, {Component} from "react";
import {Button, Fa} from 'mdbreact';
import StateLogo from './StateLogo.js';

class RowUniversity extends Component {
    constructor(props) {
        super(props);
        this.university = props.university;
    }

    clickButton(url, e) {
        e.preventDefault();
        window.open(url, "_blank") //to open new pages
    }

    render(){
        return(
            <React.Fragment>
                <tr>
                    <td className={"center-vertical"}>{this.university.university}</td>
                    <td>
                        <Button color="pink" onClick={this.clickButton.bind(this, this.university.resourcesFile)}>
                            <Fa icon="group" className="mr-1"/>
                            Liste des groupes
                        </Button>
                    </td>
                    <td>{new Date().toUTCString()}</td>
                    <td><StateLogo loginUrl={this.university.loginUrl}/></td>
                </tr>
            </React.Fragment>
        )
    }
}

export default RowUniversity;