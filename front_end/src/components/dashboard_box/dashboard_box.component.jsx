import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import  Chart from 'chart.js';
import { Pie } from'react-chartjs-2';
import './dashboard_box.styles.scss';


class DashBoardBox extends React.Component {
    constructor(props) {
        super(props);
        this.chartReference = React.createRef();
    }

    state = {
        data: {
            labels: [],
            datasets: [{
                data: [],
                label: ""
            }]
            
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
                
                
                <Jumbotron>
                    <h4>{this.props.title}</h4>
                    
                    { this.props.chartData.labels &&
                       <Pie 
                            data={this.props.chartData} 
                            ref={this.chartReference} 
                            width={300} 
                            height={300} 
                        />
                    }
                    
                    </Jumbotron>
            </div>
        )
    }
}


export default DashBoardBox;