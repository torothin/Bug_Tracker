import React from 'react';
import { InputGroup, FormControl, Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import './add_ticket.styles.scss';
import "react-datepicker/dist/react-datepicker.css";
import { default_location } from '../../helpers/default_location';
import { dateToString } from '../../helpers/date_handler';

class AddTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "",
            "body": "",
            "priority": 1,
            "category": 1,
            "type": 1,
            "project_id": 1,//this.props.projects[0].id,
            "assigned_id": 1, //this.props.users[0].id,
            "creator_id": 1,
            "est_complete_date": new Date(),
            users: [],
            projects:[],
            loaded: false,
        }
    }
    async componentWillMount() {
        let projectLoad = fetch(`${default_location}/api/projects`)
            .then(res => res.json())
            .then( (projects) => {
                let projectsArray = Object.values(projects)[0];
                this.setState({...this.state, projects: projectsArray,"project_id":projectsArray[0].id}); 
        });

        let userLoad = fetch(`${default_location}/api/users`)
            .then(res => res.json())
            .then( (users) => {
                this.setState({...this.state, users: Object.values(users)[0]}); 
        });

        await Promise.all([projectLoad, userLoad]);
        this.setState({loaded: !this.state.loaded});
    }
    

    myChangeHandler = (event) => {
        event.persist()
        const eventTargetValue = (
            event.target.id === "project_id" ||
            event.target.id === "assigned_id" ||
            event.target.id === "category" ||
            event.target.id === "priority" ||
            event.target.id === "type"
            ) ? parseInt(event.target.value) : event.target.value;
        console.log(eventTargetValue);
        this.setState({[event.target.id]: eventTargetValue});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.creatSQLQuery();
        this.props.toggleModal('');
    }

    updateDate = (event) => {
        
        this.setState({...this.state, "est_complete_date": event});
    }

    /*
        post details
        project_id: req.query.project_id,
        assigned_id: req.query.assigned_id,
        author_id: req.query.author_id,
        title: req.query.title,
        body: req.query.body,
        est_complete_date: req.query.est_complete_date,
        act_complete_date: req.query.act_complete_date,
        priority: req.query.priority,
        category: req.query.category,
        type: req.query.type,
    */
    creatSQLQuery() {
        
        // var sql = `${default_location}/api/tickets/?title=${this.state["title"]}&
        // body=${this.state["body"]}&
        // priority=${this.state["priority"]}&
        // category=${this.state["category"]}&
        // type=${this.state["type"]}&
        // project_id=${this.state["project_id"]}&
        // assigned_id=${this.state["assigned_id"]}&
        // author_id=${this.state["author_id"]}&
        // est_complete_date=${dateToString(this.state["est_complete_date"])}`;

        var sql = default_location + "/api/tickets/?title=" +
            this.state["title"] + "&body=" +
            this.state["body"] + "&priority=" +
            this.state["priority"] + "&category=" +
            this.state["category"] + "&type=" +
            this.state["type"] + "&project_id=" +
            this.state["project_id"] + "&assigned_id=" +
            this.state["assigned_id"] + "&creator_id=" +
            this.state["creator_id"] + "&creation_date=" +
            dateToString(new Date()) + "&est_complete_date=" +
            dateToString(this.state["est_complete_date"]);

        
        console.log(sql)

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
                            <InputGroup.Text>Ticket Title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id="title"
                            onChange={this.myChangeHandler}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <br/>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label size="sm">Project</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="select"
                            id="project_id"
                            onChange={this.myChangeHandler}>
                                {
                                    
                                    this.state.projects.map(item => {
                                        console.log(item);
                                        return <option value={item.id}>{item.title}</option>
                                    })
                                }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2" size="sm">
                        <Form.Label size="sm">Type</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="select"
                            id="type"
                            onChange={this.myChangeHandler}>
                            <option>1</option>
                            <option>2</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect3" size="sm">
                        <Form.Label size="sm">Category</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="select"
                            id="category"
                            onChange={this.myChangeHandler}>
                            <option>1</option>
                            <option>2</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect4" size="sm">
                        <Form.Label size="sm">Priority</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="select"
                            id="priority"
                            onChange={this.myChangeHandler}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect4" size="sm">
                        <Form.Label size="sm">Assigned to</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="select"
                            id="assigned_id"
                            onChange={this.myChangeHandler}>
                            {
                                this.state.users.map(item => {
                                    return <option value={item.id}>{item.first_name} {item.last_name}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <p className="date-picker-p">Estimated Complete Date</p>
                    <DatePicker
                        className="date-picker"
                        selected={this.state.est_complete_date}
                        value={this.state.est_complete_date}
                        onChange={this.updateDate}
                    />
                    <br/>
                   
                    <InputGroup size="sm">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Ticket Body</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                            size="sm"
                            id="body"
                            onChange={this.myChangeHandler}
                            as="textarea" 
                            aria-label="With textarea"
                        />
                    </InputGroup>
                    <Button type="submit">Submit form</Button>
                    

                </Form>
                
            </div>
        )
    }
}

export default AddTicket;