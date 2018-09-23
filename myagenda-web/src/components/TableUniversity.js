import React, { Component } from 'react';
import constant from '../Constant.js';

class TableUniversity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            university: null
        };
    }

    componentDidMount() {
        fetch(constant.myAgendaResURL+"resources.js")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        university: result
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
        const { error, isLoaded, university} = this.state;
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
                                    <h2 className="h2-responsive pb-4">Build View :</h2>
                                    <div style={{'display': 'block', 'overflowY': 'auto'}}>
                                        <Table responsive>
                                            <thead className="mdb-color lighten-4">
                                            <tr>
                                                <th className="th-lg">Nom</th>
                                                <th className="th-lg">Groups</th>
                                                <th className="th-lg">Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {university.map(job => (
                                                <RowUniversity university={university}/>
                                            ))}
                                            </tbody>
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
