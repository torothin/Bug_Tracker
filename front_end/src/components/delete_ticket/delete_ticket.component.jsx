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
            tickets: []
        }
    }
    async componentWillMount() {
        
        let projectLoad = fetch(`${default_location}/api/projects`)
            .then(res => res.json())
            .then( (projects) => {
                this.setState({...this.state, projects: Object.values(projects)[0]}); 
                //return Object.values(projects)[0];
        });

        let userLoad = fetch(`${default_location}/api/users`)
            .then(res => res.json())
            .then( (users) => {
                this.setState({...this.state, users: Object.values(users)[0]}); 
                //return Object.values(users)[0];
        });
        
        let ticketsLoad = fetch(`${default_location}/api/tickets/${this.props.editId}`)
            .then(res => res.json())
            .then( (tickets) => {
                this.setState({...this.state, tickets: Object.values(tickets)[0]},console.log(this.state,this.props)); 
                //return Object.values(tickets)[0];
        });

        await Promise.all([projectLoad, userLoad, ticketsLoad]);
        this.setState({...this.state,loaded: !this.state.loaded})
        // this.setState({...this.state, 
        //     tickets: ticketsLoad,
        //     users: userLoad,
        //     projects: projectLoad,
        //     loaded: !this.state.loaded,
        //     // "title":this.state.tickets[0].title,
        //     // "body":this.state.tickets[0].body,
        //     // "priority": this.state.tickets[0].priority,
        //     // "category": this.state.tickets[0].category,
        //     // "type": this.state.tickets[0].type,
        //     // "project_id": this.state.tickets[0].project_id,
        //     // "assigned_id": this.state.tickets[0].assigned_id,
        //     // "creator_id": this.state.tickets[0].creator_id,
        //     // "est_complete_date":this.state.tickets[0].est_complete_date},
        // },
        //     ()=>{console.log("edit_Ticket",this.state)});
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

        var sql = default_location + "/api/tickets/" + 
            this.props.editId;
            
            // + "/?title=" +
            // this.state["title"] + "&body=" +
            // this.state["body"] + "&priority=" +
            // this.state["priority"] + "&category=" +
            // this.state["category"] + "&type=" +
            // this.state["type"] + "&project_id=" +
            // this.state["project_id"] + "&assigned_id=" +
            // this.state["assigned_id"] + "&creator_id=" +
            // this.state["creator_id"] + "&creation_date=" +
            // dateToString(new Date()) + "&est_complete_date=" +
            // dateToString(this.state["est_complete_date"]);

        
        console.log(sql)

        var xhr = new XMLHttpRequest();
        xhr.open('DELETE',sql);
        xhr.send();
        
    }

    render() {
        return (
            <div>
                <Form align='center' onSubmit={this.handleSubmit} hidden={!this.state.loaded}>
                    <p>Are you sure?</p>
                    <Button type="submit">Accept</Button>
                </Form>
            </div>
        )
    }
}

export default DeleteTicket;