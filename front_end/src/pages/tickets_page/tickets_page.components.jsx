import React from 'react';
import './tickets_page.styles.scss';
import { Table } from 'react-bootstrap';


class TicketsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    componentDidMount() {
        fetch(`http://localhost:4000/api/dashboard/user/${this.props.user_id}`)
            .then(res => res.json())
            .then( (tickets) => {
                this.setState(tickets);
            }); 
    }

    componentDidUpdate() {

    }

    populateTable() {
        let test = null;
        this.state.tickets &&
        this.state.tickets.forEach(element => {
            test += (
            <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.title}</td>
                <td>{element.body}</td>
                <td>{element.est_complete_date}</td>
            </tr>
            )
        });
        //console.log(test);
        return test;
    }

    render() {
        return (
            <div className="tickets-container">
                <Table striped bordered hover>
                    <thead>
                        
                        <tr key={"header"}>
                            {
                                this.state.tickets &&
                                Object.keys(this.state.tickets[0]).map((key) => (
                                    <th>{key}</th>
                                ))
                            }
                        </tr>
                        
                    </thead>
                    <tbody>
                    
                    {
                        this.state.tickets &&
                        this.state.tickets.map((item) => (
                            <tr key={item.id}>
                                {Object.values(item).map((val) => (
                                    <td>{val}</td>
                                ))}
                            </tr>
                        ))
                    }

                    </tbody>
                </Table>
               
            </div>
        )
    }
}

export default TicketsPage;