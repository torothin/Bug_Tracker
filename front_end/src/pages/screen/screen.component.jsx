
import React from 'react';

// css
import "./screen.styles.scss";

// components
import MenuBar from '../../components/menu_bar/menu_bar.component';
import { default_location } from '../../helpers/default_location';
import PopupWindow from '../../components/popup_window/popup_window.component';

import {
    getTicketsByUser, 
    getProjects, 
    getUsers, 
    getTicketsByCategory, 
    getTicketsByType,
    getTicketsByPriority
  } from '../../helpers/fetch_calls'

import {configData} from '../../helpers/dashboardHelpers'

class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: 1,
      showModal: false,
      type: "",
      editId: 0,
      projects: [],
      tickets: [],
      loaded: false,
      priorityData: {},
      categoryData: {},
      typeData: {},
      userData: {},
    }
  }

  async componentWillMount() {
    
    let usersLoad = await getUsers();

    let tickets = await getTicketsByUser(this.props.user);
    
    await Promise.all([tickets,usersLoad])
      .then(([tickets,usersLoad])=>{
        this.setState({
          ...this.state,
          loaded: true,
          tickets: tickets,
          users: usersLoad
        })
    });
  }

  toggleModal = async (type, editId) => {
    
    // need to do checking of the input
    if(type === undefined) type = '';
    if(editId === undefined || editId === null) editId = 0;

    await getTicketsByUser(this.props.user)
      .then((tickets)=>{
        this.setState({...this.state, showModal: !this.state.showModal, type: type, editId: editId, tickets: tickets});
      });

  };

  updateData = async () => {
    //get tickets by category
    let ticketsByCategory = await getTicketsByCategory()
    
    //get tickets by type
    let ticketsByType = await getTicketsByType()

    //get tickets by priority
    let ticketsByPriority = await getTicketsByPriority()

    //get all tickets by user
    let ticketsByUser = await getTicketsByUser()

    //get users
    let usersLoad = await getUsers();

    //get projects
    let projectsLoad = await getProjects();
    
    return [ticketsByCategory,ticketsByType,ticketsByPriority,ticketsByUser,usersLoad,projectsLoad];

  }

  render() {
    return (
      <div>
        {
          this.state.loaded
          &&
          <MenuBar
            user={this.state.user}
            users={this.state.users}
            toggleModal={this.toggleModal}
            tickets={this.state.tickets}
            projects={this.state.projects}
          />
        }
        <PopupWindow 
          projects={this.props.projects} 
          users={this.props.users}
          show={this.state.showModal}
          toggleModal={this.toggleModal}
          user={this.props.user}
          type={this.state.type}
          editId={this.state.editId}
        />
      </div>
    );
  }
}

export default Screen;
