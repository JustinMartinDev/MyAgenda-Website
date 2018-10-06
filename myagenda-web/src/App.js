import React, { Component } from 'react';
import logo from './images/icon_circle.png';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import TableUniversity from "./components/ServerState/TableUniversity";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MyAgenda Tool</h1>
        </header>
          <TableUniversity/>
      </div>
        );
  }
}

export default App;
