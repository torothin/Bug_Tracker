import React from 'react';
import { Modal, Button, Jumbotron, InputGroup, FormControl } from 'react-bootstrap';
import './my_modal.styles.scss';
import AddTicket from '../add_ticket/add_ticket.component';

const MyModal = (props) => (
    <div>
         <Modal show={props.show} onHide={props.toggle}>
            <Modal.Header closeButton>
                <Modal.Title>Add Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <AddTicket 
                projects={props.projects}
                users={props.users}
                user={props.user}
            />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.toggle}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={props.toggle}>
                    Add Ticket
                </Button>
            </Modal.Footer>
        </Modal>

    </div>

)

export default MyModal;