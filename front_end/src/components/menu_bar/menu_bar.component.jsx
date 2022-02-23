import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './menu_bar.styles.scss';

// Pages
import DashBoard from '../../pages/dashboard/dashboard.component';
import TicketsPage from '../../pages/tickets_page/tickets_page.components';

const MenuBar = (props) => (
    <div className="menu_bar_container">
       
       <Tabs defaultActiveKey="dashboard" id="uncontrolled-tab-example">
            <Tab eventKey="dashboard" title="Dashboard">
                <DashBoard user_id={props.user_id}/>
            </Tab>
            <Tab eventKey="projects" title="Projects">
                
            </Tab>
            <Tab eventKey="tickets" title="Tickets">
                <TicketsPage user_id={props.user_id} tickets_data={props.tickets_data} />
            </Tab>
        </Tabs>
    </div>

)

export default MenuBar;