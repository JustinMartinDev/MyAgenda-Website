import React, { Component } from 'react';
import { TableHead, TableBody, Card, CardBody, Container, Table, Row, Col } from 'mdbreact';
import constant from '../../../Constant.js';
import RowUniversity from "./RowUniversity";
import myAgendaAPI from "../../../utils/MyAgenda-API";
import BoxMessage from "../utils/BoxMessage";
import errorImg from "../../../images/404-Animation.gif";

class TableUniversity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorMessage: null,
            isLoaded: false,
            universities: null
        };
    }

    hasBeenLoaded = (result) => {
        this.setState({
            error: null,
            errorMessage: null,
            isLoaded: true,
            universities: result
        });
    };
    notLoaded = (error) => {
        this.setState({
            error: true,
            errorMessage: error,
            isLoaded: true,
            universities: null
        });
    };

    componentDidMount() {
        myAgendaAPI.redirectJSON(constant.myAgendaResURL + "resources.json", (result) => {
            if (result.hasOwnProperty("error"))
                this.notLoaded(result.message);
            else
                this.hasBeenLoaded(result.message);
        });
    }

    render() {
        const { error, errorMessage, isLoaded, universities } = this.state;
        if (error) {
            return (
                <React.Fragment>
                    <BoxMessage message={errorMessage} classColor="red lighten-1" />
                    <img src={errorImg}/>
                </React.Fragment>
            );
        }
        else if (!isLoaded) {
            return (<p>loading .....</p>); //todo loading animated
        }
        else {
            return (
                <Container className="mt-3">
                    <Row className="py-3">
                        <Col md="12">
                            <Card>
                                <CardBody>
                                    <div style={{ 'display': 'block', 'overflowY': 'auto' }}>
                                        <Table responsive color="red">
                                            <TableHead color="red" textWhite>
                                                <tr>
                                                    <th className="th-lg">Nom</th>
                                                    <th className="th-lg">Groups</th>
                                                    <th className="th-lg">Dernière mise à jours</th>
                                                    <th className="th-lg">Status</th>
                                                </tr>
                                            </TableHead>
                                            <TableBody>
                                                {universities.map((university, index) => (
                                                    <RowUniversity university={university} key={index} />
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
