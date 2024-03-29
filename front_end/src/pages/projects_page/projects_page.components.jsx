import React from 'react';
import './projects_page.styles.scss';
import { Table, Button } from 'react-bootstrap';
import {dateToString} from '../../helpers/date_handler'


class ProjectsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           user: this.props.user,
           projects: [],
        }
    }

    componentDidMount() {
        
    }

    formatDateForDisplay (item) {
        if(item.creation_date) item.creation_date = dateToString(new Date(item.creation_date));
        
    }

    render() {
        return (
            <div className="projects-container">
                <Table striped bordered hover>
                    <thead>
                        
                        <tr key={"header"}>
                            {
                                //this.props.projects.length &&
                                Object.keys(this.props.projects[0]).map((key) => (
                                    <th>{key}</th>
                                ))
                            }
                            <td></td>
                            <td></td>
                        </tr>
                        
                    </thead>
                    <tbody>
                    
                    {
                        this.props.projects &&
                        this.props.projects.map((item) => (
                            <tr key={item.id}>
                                {
                                    this.formatDateForDisplay(item)
                                }
                                {
                                    Object.values(item).map((val) => (

                                     <td>{val}</td>
                                    ))
                                }
                                <td><Button 
                                    onClick={()=>{this.props.toggleModal('Edit Project', item.id)}}
                                    size="sm"
                                    variant="secondary">Edit</Button></td>
                                <td><Button 
                                    variant="secondary"
                                    size="sm"
                                    onClick={()=>{this.props.toggleModal('Delete Project', item.id)}}
                                    >Delete</Button></td>
                            </tr>
                        ))
                    }

                    </tbody>
                </Table>
                <Button 
                        variant="primary" 
                        onClick={()=>{this.props.toggleModal('Add Project')}}
                        >Add Project</Button>
            </div>
        )
    }
}

export default ProjectsPage;