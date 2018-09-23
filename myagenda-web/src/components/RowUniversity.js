import {Component} from "react";
import {Button, Fa} from 'mdbreact';
import StateLogo from './StateLogo';

class RowUniversity extends Component {
    constructor(props) {
        super(props);
        this.university = props.university;
    }

    clickButton(url, e) {
        e.preventDefault();
        window.open(url, "_blank") //to open new page
    }

    render(){
        return(
            <React.Fragment>
                <tr>
                    <td>this.university.university</td>
                    <td>
                        <Button color="pink" onClick={this.clickButton.bind(this, this.job.url)}>
                            <Fa icon="group" className="mr-1"/>
                        </Button> Liste des groupes
                    </td>
                    <td><StateLogo color={this.job.color}/></td>
                </tr>
            </React.Fragment>
        )
    }
}

export default RowUniversity;