import React from 'react';

// Pages
import DashBoard from './pages/dashboard/dashboard.component';

//css
import './App.css';

class App extends React.Component {
  
  state = {
    users: null,
  }
  
  componentDidMount() {
    fetch('http://localhost:4000/api/users')
      .then(res => res.json())
      .then( ({data}) => {
        this.setState({users: data});
      });
  }

  render() {
    return (
      <div className="App">
        <DashBoard users={this.state.users}/>
          
      </div>
    );
  }
}

export default App;
