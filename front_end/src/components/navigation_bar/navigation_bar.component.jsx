import React from 'react';
import { Navbar,Nav,NavDropdown,Button } from 'react-bootstrap';
import PopupWindow from '../popup_window/popup_window.component';
import popup_window from '../popup_window/popup_window.component';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    userDetails() {

        let obj = this.props.users.find(o => o.id === this.props.user);
        if(obj) {return `${obj["first_name"]} ${obj["last_name"]}`}
        return this.props.user;
        
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
                    
                    
                    </Nav>
                </Navbar.Collapse>
                
                <h1>{this.userDetails()}</h1>
            </Navbar>
        )
    }
}

export default NavigationBar;