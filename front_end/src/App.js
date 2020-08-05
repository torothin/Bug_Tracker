import React from 'react';

// Pages
import DashBoard from './pages/dashboard/dashboard.component';

//css
import './App.css';

class App extends React.Component {
  
  state = {
    data: null,
  }
  
  componentDidMount() {
    fetch('http://http://localhost:4000/')
      .then(res => res.json())
      .then( ({data}) => {
        console.log(data);
      });
  }

  render() {
    return (
      <div className="App">
        <DashBoard>
          
        </DashBoard>
      </div>
    );
  }
}

export default App;
