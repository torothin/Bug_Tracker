import React from 'react';
import { InputGroup, FormControl, Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import './add_project.styles.scss';
import "react-datepicker/dist/react-datepicker.css";
import { default_location } from '../../helpers/default_location';
import { dateToString } from '../../helpers/date_handler';

/*
Project details
author_id INT,
owner_id INT,
creation_date DATETIME,
title VARCHAR(255), 
body TEXT, 


*/

class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "",
            "body": "",
            "owner_id": props.user,
            "author_id": props.user,
            "creation_date": new Date(),
            users: [],
            loaded: false
        }
    }

    async componentWillMount() {
        let userLoad = fetch(`${default_location}/api/users`)
            .then(res => res.json())
            .then( (users) => {
                this.setState({...this.state, users: Object.values(users)[0]}); 
        });

        await Promise.all([userLoad]);
        this.setState({loaded: !this.state.loaded});
    }

    myChangeHandler = (event) => {
        event.persist()
        const eventTargetValue = (
            event.target.id === "owner_id" ||
            event.target.id === "assigned_id"
            ) ? parseInt(event.target.value) : event.target.value;
        this.setState({[event.target.id]: eventTargetValue});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.creatSQLQuery();
        this.props.toggleModal('');
       
    }

    updateDate = (event) => {
        
        this.setState({...this.state, "creation_date": dateToString(event)});
    }

    /*
        post details
        author_id INT,
        owner_id INT,
        creation_date DATETIME,
        title VARCHAR(255), 
        body TEXT, 
    */
    creatSQLQuery() {
        
        
        var sql = default_location + "/api/projects/?title=" + 
        this.state["title"] + "&body=" +
        this.state["body"] + "&owner_id=" + 
        this.state["owner_id"] + "&author_id=" +
        this.state["author_id"] + "&creation_date=" + 
        this.state["creation_date"];
                
        var xhr = new XMLHttpRequest();
        xhr.open('POST',sql);
        xhr.send();
        
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} hidden={!this.state.loaded}>
                    <InputGroup size="sm">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id="title"
                            onChange={this.myChangeHandler}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <br/>
                    
                    <Form.Group size="sm">
                        <Form.Label size="sm">Assigned to</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="select"
                            id="owner_id"
                            onChange={this.myChangeHandler}>
                            {
                                this.state.users.map(item => {
                                    return <option value={item.id}>{item.first_name} {item.last_name}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <p className="date-picker-p">Creation Date</p>
                    <DatePicker
                        
                        className="date-picker"
                        selected={this.state.creation_date}
                        value={this.state.creation_date}
                        onChange={this.updateDate}
                    />
                    <br/>
                   
                    <InputGroup size="sm">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Details</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                            size="sm"
                            id="body"
                            onChange={this.myChangeHandler}
                            as="textarea" 
                            aria-label="With textarea"
                        />
                    </InputGroup>
                    <br />
                    <Button type="submit">Accept</Button>
                    

                </Form>
                
            </div>
        )
    }
}

export default AddProject;