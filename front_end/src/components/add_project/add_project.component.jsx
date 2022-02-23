import React from 'react';
import { InputGroup, FormControl, Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import './add_project.styles.scss';
import "react-datepicker/dist/react-datepicker.css";

import { withRouter } from "react-router-dom";

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
            "owner_id": this.props.user,
            "author_id": this.props.user,
            "creation_date": null,
        }
    }

    myChangeHandler = (event) => {
        // let eventTargetValue = event.target.value;
        //event.persist()
        const eventTargetValue = (
            event.target.id === "owner_id" ||
            event.target.id === "assigned_id"
            ) ? parseInt(event.target.value) : event.target.value;
        console.log(eventTargetValue);
        this.setState({[event.target.id]: eventTargetValue});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.creatSQLQuery();
        console.log("handlesubmit");
    }

    updateDate = (event) => {
        console.log("updateDate:");
        console.log(event);
        this.setState({...this.state, "creation_date": event});
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
        
        //var sql = 'http://localhost:4000/api/projects/?title=${this.state["title"]}&body=${this.state["body"]}&owner_id=${this.state["owner_id"]}&author_id=${this.state["author_id"]}`;
        //&creation_date=${this.state["creation_date"]}

        var sql = "http://localhost:4000/api/projects/?title=" + 
        this.state["title"] + "&body=" +
        this.state["body"] + "&owner_id=" + 
        this.state["owner_id"] + "&author_id=" +
        this.state["author_id"];
                
        console.log("sql:", sql, this.props.history);
        this.props.history.push(sql);
        
    }

    render() {
        console.log("this.props.users:", this.props.users);
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
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
                    {/* <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label size="sm">Project</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="select"
                            id="project_id"
                            onChange={this.myChangeHandler}>
                                {
                                    this.props.projects.map(item => {
                                        return <option value={item.id}>{item.title}</option>
                                    })
                                }
                        </Form.Control>
                    </Form.Group> */}
                    {/* <Form.Group controlId="exampleForm.ControlSelect2" size="sm">
                        <Form.Label size="sm">Type</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="select"
                            id="type"
                            onChange={this.myChangeHandler}>
                            <option>1</option>
                            <option>2</option>
                        </Form.Control>
                    </Form.Group> */}
                    {/* <Form.Group controlId="exampleForm.ControlSelect3" size="sm">
                        <Form.Label size="sm">Category</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="select"
                            id="category"
                            onChange={this.myChangeHandler}>
                            <option>1</option>
                            <option>2</option>
                        </Form.Control>
                    </Form.Group> */}
                    
                    <Form.Group size="sm">
                        <Form.Label size="sm">Assigned to</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="select"
                            id="owner_id"
                            onChange={this.myChangeHandler}>
                            {
                                this.props.users.map(item => {
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

export default withRouter(AddProject);