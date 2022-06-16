import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './delete_project.styles.scss';
import "react-datepicker/dist/react-datepicker.css";
import { default_location } from '../../helpers/default_location';

class DeleteProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.creatSQLQuery();
        this.props.toggleModal('');
    }

    async creatSQLQuery() {

        var sql = default_location + "/api/projects/" + 
            this.props.editId;
            
        const projectUpdate = fetch(sql,{
            method: 'DELETE'
            })
            .then(res => {
                res.json()
                console.log(res)
            })
         
        await Promise.all([projectUpdate])
        .then(()=>{
            return Promise;
        });
    }

    render() {
        return (
            <div>
                <Form align='center' onSubmit={this.handleSubmit}>
                    <p>Are you sure?</p>
                    <Button type="submit">Accept</Button>
                </Form>
            </div>
        )
    }
}

export default DeleteProject;