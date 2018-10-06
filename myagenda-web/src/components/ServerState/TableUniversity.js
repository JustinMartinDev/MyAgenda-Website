import React, { Component } from 'react';
import {TableHead, TableBody, Card, CardBody, Container, Table, Row, Col} from 'mdbreact';
import constant from '../../Constant.js';
import RowUniversity from "./RowUniversity";

class TableUniversity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            universities: null
        };
    }

    componentDidMount() {
        fetch(constant.myAgendaResURL+"resources.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        universities: result
                    })
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    });
                });
    }

    render() {
        const { error, isLoaded, universities} = this.state;
        if (error) {
            return(
                <Card color="red lighten-1" text="white" className="text-left">
                    <CardBody>
                        Error with the api call :
                        <ul>
                            <li>Action : "liste universités"  </li>
                            <li>Message : {error.message}</li>
                        </ul>
                    </CardBody>
                </Card>
            );
        }
        else if(!isLoaded){
            return (<p>loading .....</p>); //todo loading animated
        }
        else {
            return (
                <Container className="mt-3">
                    <Row className="py-3">
                        <Col md="12">
                            <Card>
                                <CardBody>
                                    <div style={{'display': 'block', 'overflowY': 'auto'}}>
                                        <Table responsive color="red">
                                            <TableHead color="red" textWhite>
                                            <tr>
                                                <th className="th-lg">Nom</th>
                                                <th className="th-lg">Groups</th>
                                                <th className="th-lg">Status</th>
                                            </tr>
                                            </TableHead>
                                            <TableBody>
                                            {universities.map(university => (
                                                <RowUniversity university={university}/>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }


    }
}

export default TableUniversity;
