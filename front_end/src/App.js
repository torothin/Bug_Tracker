import React from 'react';

// Pages
import DashBoard from './pages/dashboard/dashboard.component';

//css
import './App.css';

class App extends React.Component {
  
  state = {
    users: [],
    projects: [],
    tickets: [],
    comments: [],
  }
  
  
  componentDidMount() {
    fetch('http://localhost:4000/api/users')
      .then(res => res.json())
      .then( (users) => {
        this.setState({...this.state, users: Object.values(users)[0]});
      });

      fetch('http://localhost:4000/api/tickets')
        .then(res => res.json())
        .then( (tickets) => {
          this.setState({...this.state, tickets: Object.values(tickets)[0]}); 
      });

      fetch('http://localhost:4000/api/comments')
        .then(res => res.json())
        .then( (comments) => {
          this.setState({...this.state, comments: Object.values(comments)[0]}); 
      });

      fetch('http://localhost:4000/api/projects')
        .then(res => res.json())
        .then( (projects) => {
          this.setState({...this.state, projects: Object.values(projects)[0]}); 
      });
  }

  render() {
    return (
      <div className="App">
        
        <DashBoard 
          users = {this.state.users}
          comments = {this.state.comments}
          projects = {this.state.projects}
          tickets = {this.state.tickets}
        />
       
      </div>
    );
  }
}

export default App;
