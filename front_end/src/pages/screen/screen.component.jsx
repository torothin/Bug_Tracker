
import React from 'react';

// css
import "./screen.styles.scss";

// components
import MenuBar from '../../components/menu_bar/menu_bar.component';
import { default_location } from '../../helpers/default_location';
import PopupWindow from '../../components/popup_window/popup_window.component';

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
      loaded: false
    }
  }

  async componentWillMount() {
    
    let usersLoad =  fetch(`${default_location}/api/users`)
        .then(res => res.json())
        .then( (users) => {
          return Object.values(users)[0]
      });

    let ticketLoad = fetch(`${default_location}/api/dashboard/tickets/${this.state.user}`)
        .then(res => res.json())
        .then( (tickets) => {
          return Object.values(tickets)[0]
    });
    
    await Promise.all([ticketLoad,usersLoad])
      .then(([ticketLoad,usersLoad])=>{
        console.log("after promise",this.state)
        this.setState({
          ...this.state,
          loaded: true,
          tickets: ticketLoad,
          users: usersLoad
        },()=>{console.log("after setstate")})
    });

    console.log("screen after loaded", this.state)
  }
  
  componentDidMount() {
    console.log("componentDidMount", this.state)
  }

  componentDidUpdate () {
    //console.log("screen updated");
  };

  toggleModal = async (type, editId) => {
    

    // need to do checking of the input
    if(type === undefined) type = '';
    if(editId === undefined || editId === null) editId = 0;


    //this.setState({...this.state, showModal: !this.state.showModal, type: type, editId: editId});
    
    // uses the current state (prior to closing modal) to refresh ticket data
    // if(this.state.type==='Edit Ticket') {
    //   tickets = await this.getTickets().then((tickets)=>{
    //     this.setState({...this.state, showModal: !this.state.showModal, type: type, editId: editId, tickets: tickets});
    //   });
    // }
    // console.log("screen tickets",tickets)
    // this.setState({...this.state, showModal: !this.state.showModal, type: type, editId: editId, tickets: tickets});

    //let tickets = this.getTickets();
    
    await this.getTickets()
      .then((tickets)=>{
        console.log("tickets",tickets);
        this.setState({...this.state, showModal: !this.state.showModal, type: type, editId: editId, tickets: tickets});
      });

  };

  //returns a promise containing a tickets array
  getTickets = async () => {
    let ticketsLoad = fetch(`${default_location}/api/dashboard/tickets/${this.state.user}`)
        .then(res => res.json())
        .then( (tickets) => {
            return Object.values(tickets)[0];

    });
    
    return ticketsLoad;
    
}

getProjects = async () => {
  let projectLoad = fetch(`${default_location}/api/projects`)
      .then(res => res.json())
      .then( (projects) => {
          return Object.values(projects)[0];
  });

  await Promise.all([projectLoad])
  .then(([projects])=>{
    console.log("getProjects", projects)
      return projects;
  });
  
}

  render() {
    return (
      <div>
        {
          console.log("this.state",this.state.loaded, this.state)
        }
          {
            this.state.loaded
            &&
            <MenuBar
              user={this.state.user}
              users={this.state.users}
              toggleModal={this.toggleModal}
              tickets={this.state.tickets}
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
