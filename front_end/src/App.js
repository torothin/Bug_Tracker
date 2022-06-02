import React from 'react';
import { Router } from 'react-router-dom';
import history from './helpers/history';

// Pages
import DashBoard from './pages/dashboard/dashboard.component';

// css
import './App.scss';

// components
import NavigationBar from './components/navigation_bar/navigation_bar.component';
import { default_location } from './helpers/default_location';
import Screen from './pages/screen/screen.component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: 1,
      showModal: false,
      type: ""
    }
  }

  componentWillMount() {
    fetch(`${default_location}/api/users`)
      .then(res => res.json())
      .then( (users) => {
        this.setState({...this.state, users: Object.values(users)[0]});
    });


  };

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <NavigationBar 
            user={this.state.user}
            users={this.state.users}
          />
          <Screen
            user={this.state.user}
            users={this.state.users}
          />
        </div>
      </Router>
    );
  }
}

export default App;
