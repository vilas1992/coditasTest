import React, { Component } from 'react';
import Gituser from './githubUserContainer/component/gitHubUserListComponent';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <h1>My test</h1>
       <Gituser />
      </div>
    );
  }
}


export default App;

