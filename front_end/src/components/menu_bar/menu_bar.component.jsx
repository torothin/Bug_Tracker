import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import DashBoard from '../../pages/dashboard/dashboard.component'
import './menu_bar.styles.scss';

const MenuBar = (props) => (
    <div className="menu_bar_container">
       <Tabs defaultActiveKey="dashboard" id="uncontrolled-tab-example">
            <Tab eventKey="dashboard" title="Dashboard">
                {/* <DashBoard /> */}
            </Tab>
            <Tab eventKey="projects" title="Projects">
                
            </Tab>
            <Tab eventKey="tickets" title="Tickets">
               
            </Tab>
        </Tabs>
    </div>

)

export default MenuBar;