import React from 'react';
import { Navbar,Nav,NavDropdown,Button } from 'react-bootstrap';
import AddTicket from '../add_ticket/add_ticket.component';
import AddModal from '../add_modal/add_modal.component';

class SignUpBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            addType: ""
        }
    }

    toggleModal = () => {
        this.setState({...this.state, showModal: !this.state.showModal, addType: ''});
    }
    toggleModalTicket = () => {
        this.setState({...this.state, showModal: !this.state.showModal, addType: 'Ticket'});
    }
    toggleModalProject = () => {
        this.setState({...this.state, showModal: !this.state.showModal, addType: 'Project'});
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
                    <Button 
                        variant="primary" 
                        onClick={this.toggleModalTicket}
                        >Add Ticket</Button>
                    <Button 
                        variant="primary" 
                        onClick={this.toggleModalProject}
                        >Add Project</Button>
                    </Nav>
                </Navbar.Collapse>
                <AddModal 
                    projects={this.props.projects} 
                    users={this.props.users}
                    show={ this.state.showModal } 
                    toggle={this.toggleModal}
                    user={this.props.user}
                    addType={this.state.addType}
                />
                <h1>User: {this.props.user_id}</h1>
            </Navbar>
        )
    }
}

export default SignUpBar;