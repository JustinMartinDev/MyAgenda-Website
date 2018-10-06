import React, { Component } from 'react';
import logo from '../images/icon_circle.png';
import TableUniversity from "./components/home/TableUniversity";
import FormUniversity from "./components/home/FormUniversity";


class Home extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">MyAgenda Tool</h1>
                </header>
                <TableUniversity/>
                <FormUniversity/>
            </div>
        );
    }
}

export default Home;
