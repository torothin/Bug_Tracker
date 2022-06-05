import React from 'react';
import './dashboard.styles.scss';
import DashBoardBox from '../../components/dashboard_box/dashboard_box.component';
import { Container, Row, Col } from 'react-bootstrap';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="dashboard-container">
                
                <Container fluid="md"> 
                    <Row xs={1} md={2}>
                        <Col className='padded-col'>
                            <DashBoardBox title="Ticket Priority" chartData={this.props.priorityData} type="priority" />
                        </Col>
                        <Col className='padded-col'>
                            <DashBoardBox title="Ticket Category" chartData={this.props.categoryData} type="category" />
                        </Col>
                    </Row>
                    <Row xs={1} md={2}>
                        <Col className='padded-col'>
                            <DashBoardBox title="Ticket Type" chartData={this.props.typeData} type="type" />
                        </Col>
                        <Col className='padded-col'>
                            <DashBoardBox title="User's Tickets" chartData={this.props.userData} type="user" />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DashBoard;