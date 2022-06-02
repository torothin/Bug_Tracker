import React from 'react';
import { Modal } from 'react-bootstrap';
import './popup_window.styles.scss';
import AddTicket from '../add_ticket/add_ticket.component';
import AddProject from '../add_project/add_project.component';
import EditProject from '../edit_project/edit_project.components';
import EditTicket from '../edit_ticket/edit_ticket.component';
import DeleteTicket from '../delete_ticket/delete_ticket.component';

const PopupWindow = (props) => (
   
    <div>
        <Modal show={props.show} onHide={props.toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title>{props.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props.type === 'Add Ticket'
                    &&
                    <AddTicket 
                        projects={props.projects}
                        users={props.users}
                        toggleModal={props.toggleModal}
                    />
                }
                {
                    props.type === 'Add Project'
                    &&
                    <AddProject
                        projects={props.projects}
                        users={props.users}
                        user={props.user}
                        toggleModal={props.toggleModal}
                    />
                }
                {
                     props.type === 'Edit Project'
                     &&
                     <EditProject
                         users={props.users}
                         user={props.user}
                         toggleModal={props.toggleModal}
                         editId={props.editId}
                     />
                }
                {
                     props.type === 'Edit Ticket'
                     &&
                     <EditTicket
                         users={props.users}
                         user={props.user}
                         toggleModal={props.toggleModal}
                         editId={props.editId}
                     />
                }
                {
                     props.type === 'Delete Ticket'
                     &&
                     <DeleteTicket
                         users={props.users}
                         user={props.user}
                         toggleModal={props.toggleModal}
                         editId={props.editId}
                     />
                }
            </Modal.Body>
        </Modal>

    </div>

)

export default PopupWindow;