import React from 'react';

// css
import "./screen.styles.scss";

// components
import MenuBar from '../../components/menu_bar/menu_bar.component';
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

    let projects = await getProjects();

    const dashboardPromises = await this.getDashboardData();
    
    await Promise.all([...dashboardPromises, tickets, usersLoad, projects])
      .then(([ticketsByCategory,ticketsByType,ticketsByPriority,ticketsByUser,tickets,usersLoad, projects])=>{
        this.setState({
          ...this.state,
          loaded: true,
          tickets: tickets,
          users: usersLoad,
          projects: projects,
          priorityData: configData("priority",ticketsByPriority),
          categoryData: configData("category",ticketsByCategory),
          typeData: configData("type",ticketsByType),
          userData: configData("user",ticketsByUser),
        })
    });
  }

  toggleModal = async (type, editId) => {
    
    // need to do checking of the input
    if(type === undefined) type = '';
    if(editId === undefined || editId === null) editId = 0;

    // closing the modal causing a data refresh
    if(type === "") {
      let usersLoad = await getUsers();

      let tickets = await getTicketsByUser(this.props.user);

      let projects = await getProjects();

      const dashboardPromises = await this.getDashboardData();
      
      await Promise.all([...dashboardPromises, tickets,usersLoad, projects])
        .then(([ticketsByCategory,ticketsByType,ticketsByPriority,ticketsByUser,tickets,usersLoad, projects])=>{
          this.setState({
            ...this.state,
            loaded: true,
            tickets: tickets,
            users: usersLoad,
            projects: projects,
            showModal: !this.state.showModal, 
            priorityData: configData("priority",ticketsByPriority),
            categoryData: configData("category",ticketsByCategory),
            typeData: configData("type",ticketsByType),
            userData: configData("user",ticketsByUser),
          })
      });
    }

    // openning the modal
    if(type !== "") {
      this.setState({...this.state, showModal: !this.state.showModal, type: type, editId: editId});
    }

  };

  getDashboardData = async () => {
    //get tickets by category
    const ticketsByCategory = await getTicketsByCategory();
    
    //get tickets by type
    const ticketsByType = await getTicketsByType();

    //get tickets by priority
    const ticketsByPriority = await getTicketsByPriority();

    //get all tickets by user
    const ticketsByUser = await getTicketsByUser(this.state.user);
    
    return [ticketsByCategory,ticketsByType,ticketsByPriority,ticketsByUser];

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
            priorityData= {this.state.priorityData}
            categoryData= {this.state.categoryData}
            typeData= {this.state.typeData}
            userData= {this.state.userData}
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
