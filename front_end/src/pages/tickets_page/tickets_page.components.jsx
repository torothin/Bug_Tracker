import React from 'react';
import './tickets_page.styles.scss';
import { Table, Button } from 'react-bootstrap';
import { default_location } from '../../helpers/default_location';
import {dateToString} from '../../helpers/date_handler';


class TicketsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           user: this.props.user,
           loaded: false,
           tickets: [],
        }
    }

    // async componentWillMount() {
    //     console.log("TicketsPage componentWillMount", this.state.tickets, this.props.tickets)
    //     let ticketLoad = fetch(`${default_location}/api/dashboard/tickets/${this.props.user}`)
    //         .then(res => res.json())
    //         .then( (tickets) => {
    //             this.setState({...this.state, tickets: Object.values(tickets)[0]}); 
    //     });
            
    //     await Promise.all([ticketLoad]);
    //     this.setState({loaded: true});
    // }

    componentDidMount(){
        console.log("TicketsPage componentDidMount", this.state.tickets, this.props.tickets)
    }

    componentDidUpdate() {
        console.log("TicketsPage componentDidUpdate", this.state.tickets, this.props.tickets)
    }


    formatDateForDisplay (item) {
        if(item.creation_date) item.creation_date = dateToString(new Date(item.creation_date));
        if(item.act_complete_date) item.act_complete_date = dateToString(new Date(item.act_complete_date));
        if(item.est_complete_date) item.est_complete_date = dateToString(new Date(item.est_complete_date));
        
    }

    render() {
        return (
            
            <div className="tickets-container" >
                <Table striped bordered hover hidden={this.props.tickets === undefined}> 
                
                    <thead>
                        <tr key={"header"}>
                        <td></td>
                        <td></td>
                        {
                            
                            // this.props.tickets.length > 0
                            // &&
                            Object.keys(this.props.tickets[0]).map((key) => (
                                <th>{key}</th>
                            ))
                        }
                        </tr>
                    </thead>
                    <tbody>

                    {
                        // this.props.tickets.length > 0 
                        // &&
                        this.props.tickets.map((item) => (
        
                            <tr key={item.id}>
                                <td><Button 
                                    variant="secondary"
                                    size="sm"
                                    onClick={()=>{this.props.toggleModal('Edit Ticket', item.id)}}
                                    >Edit</Button></td>
                                <td><Button 
                                    variant="secondary"
                                    size="sm"
                                    onClick={()=>{this.props.toggleModal('Delete Ticket', item.id)}}
                                    >Delete</Button></td>
                                {
                                    this.formatDateForDisplay(item)
                                }
                                {
                                    Object.values(item).map((val) => (
                                     <td>{val}</td>
                                    ))
                                }
                                
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
                <Button 
                    variant="primary" 
                    onClick={()=>{this.props.toggleModal('Add Ticket',0)}}
                    >Add Ticket</Button>
            </div>
                
        )
    }
}

export default TicketsPage;