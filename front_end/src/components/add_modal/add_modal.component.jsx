import React from 'react';
import { Modal, Button, Jumbotron, InputGroup, FormControl } from 'react-bootstrap';
import './add_modal.styles.scss';
import AddTicket from '../add_ticket/add_ticket.component';
import AddProject from '../add_project/add_project.component';

const AddModal = (props) => (
   
    <div>
         <Modal show={props.show} onHide={props.toggle}>
            <Modal.Header closeButton>
                <Modal.Title>Add {props.addType}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props.addType == 'Ticket'
                    &&
                    <AddTicket 
                        projects={props.projects}
                        users={props.users}
                        user={props.user}
                    />
                }
                {
                    props.addType == 'Project'
                    &&
                    <AddProject
                        projects={props.projects}
                        users={props.users}
                        user={props.user}
                    />
                }
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={props.toggle}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={props.toggle}>
                    Accept
                </Button>
            </Modal.Footer> */}
        </Modal>

    </div>

)

export default AddModal;