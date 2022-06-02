import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './menu_bar.styles.scss';

// Pages
import DashBoard from '../../pages/dashboard/dashboard.component';
import TicketsPage from '../../pages/tickets_page/tickets_page.components';
import ProjectsPage from '../../pages/projects_page/projects_page.components';




class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidUpdate() {
        console.log("MenuBar componentDidUpdate")
    }

    render() {
        return (
            <div className="menu_bar_container">
            
            <Tabs defaultActiveKey="dashboard" id="uncontrolled-tab-example">
                    <Tab eventKey="dashboard" title="Dashboard">
                        <DashBoard user={this.props.user}/>
                    </Tab>
                    <Tab eventKey="tickets" title="Tickets">
                        {console.log("menu_bar tickets",this.props)}
                        <TicketsPage 
                            user={this.props.user}
                            toggleModal={this.props.toggleModal} 
                            tickets={this.props.tickets}
                        />
                
                    </Tab>
                    <Tab eventKey="projects" title="Projects">
                        <ProjectsPage 
                            user={this.props.user}
                            toggleModal={this.props.toggleModal} />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default MenuBar;