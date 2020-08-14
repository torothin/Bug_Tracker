import React from 'react';
import { Card } from 'react-bootstrap';
import  Chart from 'chart.js';
import { Pie } from'react-chartjs-2';
import './dashboard_box.styles.scss';


class DashBoardBox extends React.Component {
    constructor(props) {
        super(props);
        this.chartReference = React.createRef();
    

        this.state = {
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    label: ""
                }]}
        }
    }

    componentDidMount() {
        // console.log(this.chartReference); // returns a Chart.js instance reference
        //this.sortData();
    }
    componentDidUpdate() {
        //this.setState({data: this.props.chartData})
    }
    

    render() {
        return (
            <div className="box">
                <Card bg={ "light" }>
                    <Card.Body>
                
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                        { this.props.chartData.labels &&
                        <Pie 
                            data={this.props.chartData} 
                            ref={this.chartReference} 
                            width={100} 
                            height={200} 
                            options={{ maintainAspectRatio: false }}
                        />
                        }
                    </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}


export default DashBoardBox;