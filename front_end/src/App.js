import React from 'react';
import { Router } from 'react-router-dom';
import history from './helpers/history';

// Pages
import DashBoard from './pages/dashboard/dashboard.component';

// css
import './App.scss';

// components
import MenuBar from './components/menu_bar/menu_bar.component';
import SignUpBar from './components/signup_bar/signup_bar.component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      projects: [],
      tickets: [],
      comments: [],
      user_id: 1,
    }
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
      <Router history={history}>
        <div className="App">
          <SignUpBar 
            projects={this.state.projects}
            users={this.state.users}
            user_id={this.state.user_id}

          />
          <MenuBar
            user_id={this.state.user_id}
            tickets_data={this.state.tickets}
          />

        </div>
      </Router>
    );
  }
}

export default App;
