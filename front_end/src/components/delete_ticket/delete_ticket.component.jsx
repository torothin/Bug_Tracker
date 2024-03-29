import React from 'react';
import { InputGroup, FormControl, Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import './delete_ticket.styles.scss';
import "react-datepicker/dist/react-datepicker.css";
import { default_location } from '../../helpers/default_location';
import { dateToString } from '../../helpers/date_handler';

class DeleteTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.creatSQLQuery();
        this.props.toggleModal('');
    }

    async creatSQLQuery() {

        var sql = default_location + "/api/tickets/" + 
            this.props.editId;
            
        const ticketDelete = fetch(sql,{
            method: 'DELETE'
        })
            .then(res => {
                res.json()
                console.log(res)
            })
            
        
        console.log("ticketDelete",ticketDelete)
        
        await Promise.all([ticketDelete])
        .then(()=>{
            return Promise;
        });
        
    }

    render() {
        return (
            <div>
                <Form align='center' onSubmit={this.handleSubmit}>
                    <p>Are you sure?</p>
                    <Button type="submit">Accept</Button>
                </Form>
            </div>
        )
    }
}

export default DeleteTicket;