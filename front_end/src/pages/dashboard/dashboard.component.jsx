import React from 'react';
import './dashboard.styles.scss';
import DashBoardBox from '../../components/dashboard_box/dashboard_box.component';

class DashBoard extends React.Component {

    state = {
        category: [],
        type: [],
        user: [],
        priority: [],
        user_id: 3,
    }

    componentDidMount() {
        fetch('http://localhost:4000/api/dashboard/priority')
            .then(res => res.json())
            .then( (priority) => {
                this.setState({...this.state, priority: Object.values(priority)[0]});
            }
        );

        fetch('http://localhost:4000/api/dashboard/category')
            .then(res => res.json())
            .then( (category) => {
                this.setState({...this.state, category: Object.values(category)[0]});
            }
        );

        fetch('http://localhost:4000/api/dashboard/type')
            .then(res => res.json())
            .then( (type) => {
                this.setState({...this.state, type: Object.values(type)[0]});
            }
        );

        fetch(`http://localhost:4000/api/dashboard/user/${this.state.user_id}`)
            .then(res => res.json())
            .then( (user) => {
                console.log(user);
                this.setState({...this.state, user: Object.values(user)[0]});
            }
        );
    }

    render() {
        return (
            <div className='dashboard-container'>
                <DashBoardBox title="Ticket Priority" data={this.state.priority} />
                <DashBoardBox title="Ticket Category" data={this.state.category} />
                <DashBoardBox title="Ticket Type" data={this.state.type} />
                <DashBoardBox title="User's Tickets" data={this.state.user} />
                
            </div>

        )
    }
    
}

export default DashBoard;