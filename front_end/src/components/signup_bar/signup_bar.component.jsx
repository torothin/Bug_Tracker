import React from 'react';
import { Navbar,Nav,NavDropdown,Button } from 'react-bootstrap';
import AddTicket from '../add_ticket/add_ticket.component';
import MyModal from '../my_model/my_modal.component';

class SignUpBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    toggleModal = () => {
        this.setState({...this.state, showModal: !this.state.showModal});
    }

    render() {
        return (
            <Navbar bg="light" expand="lg" className='nav-bar'>
                <Navbar.Brand href="#home">Bug Tracker (in dev)</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    <Button variant="primary" onClick={this.toggleModal}>Add Ticket</Button>
                    </Nav>
                </Navbar.Collapse>
                <MyModal 
                    projects={this.props.projects} 
                    users={this.props.users}
                    show={ this.state.showModal } 
                    toggle={this.toggleModal}
                    user={this.props.user}
                />
            </Navbar>
        )
    }
}

export default SignUpBar;