import React from 'react';
import './dashboard.styles.scss';
import DashBoardBox from '../../components/dashboard_box/dashboard_box.component';
import { Container, Row, Col } from 'react-bootstrap';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "category": [],
            "type": [],
            "user": [],
            "priority": [],
            priorityData: {},
            categoryData: {},
            typeData: {},
            userData: {},
            user_id: this.props.user_id,
        }
    }

    componentDidMount() {
        fetch(`http://localhost:4000/api/dashboard/priority`)
            .then(res => res.json())
            .then( (priority) => {
                const configedData = this.configData("priority",Object.values(priority)[0]);
                this.setState({"priority": Object.values(priority)[0],priorityData: configedData});
            }
        );

        fetch('http://localhost:4000/api/dashboard/category')
            .then(res => res.json())
            .then( (category) => {
                const configedData = this.configData("category",Object.values(category)[0]);
                this.setState({"category": Object.values(category)[0],categoryData: configedData});
            }
        );

        fetch('http://localhost:4000/api/dashboard/type')
            .then(res => res.json())
            .then( (type) => {
                const configedData = this.configData("type",Object.values(type)[0]);
                this.setState({"type": Object.values(type)[0],typeData: configedData});
            }
        );

        fetch(`http://localhost:4000/api/dashboard/user/${this.props.user_id}`)
            .then(res => res.json())
            .then( (user) => {
                const configedData = this.configData("user",Object.values(user)[0]);
                this.setState({"user": Object.values(user)[0],userData: configedData});
            }); 
    }

    configData(type, inputData) {
        const dataMap = {};
        const labels = [];
        const dataArray = [];
        const inputType = type === 'user' ? 'type' : type;

        // takes the JSON data and creates a map of the ticket type (key) 
        // to the number of tickets (value)
        // doing it this way such that string and int data types will work for 
        // creating the new datasets
        inputData.map(item => {
            if(!dataMap[item[inputType]]) {
                dataMap[item[inputType]] = 1;
            }
            else dataMap[item[inputType]]++;
            return item;
        })

        // turns the map into two arrays for labels and number of tickets
        for (let property in dataMap) {
            if (!dataMap.hasOwnProperty(property)) {
                continue;
            }
            labels.push(property);
            dataArray.push(dataMap[property]);
        }
        
        // blank dataset
        const newDataSet = {
            labels: [],
            datasets: [{label:type,data:[],
                    backgroundColor: [
                        this.randomColor(0.2),
                        this.randomColor(0.2),
                        this.randomColor(0.2),
                        this.randomColor(0.2),
                        this.randomColor(0.2),
                        this.randomColor(0.2)
                    ],
                    
                    borderWidth: 1}],
        };

        newDataSet.labels = labels;
        newDataSet.datasets[0].data = dataArray;
        
        return newDataSet;
    }

    randomColor(opacity) {
        return `rgba(${Math.floor(Math.random()*255)}, 
                     ${Math.floor(Math.random()*255)}, 
                     ${Math.floor(Math.random()*255)}, 
                     ${opacity})`
    }

    render() {
        return (
            <div className="dashboard-container">
                
                <Container fluid="md"> 
                    <Row xs={1} md={2}>
                        <Col className='padded-col'>
                            <DashBoardBox title="Ticket Priority" chartData={this.state.priorityData} type="priority" />
                        </Col>
                        <Col className='padded-col'>
                            <DashBoardBox title="Ticket Category" chartData={this.state.categoryData} type="category" />
                        </Col>
                    </Row>
                    <Row xs={1} md={2}>
                        <Col className='padded-col'>
                            <DashBoardBox title="Ticket Type" chartData={this.state.typeData} type="type" />
                        </Col>
                        <Col className='padded-col'>
                            <DashBoardBox title="User's Tickets" chartData={this.state.userData} type="user" />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DashBoard;