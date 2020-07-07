import React from 'react';
import './App.css';
import GridContainer from './GridContainer';
import UserInfoContainer from './UserInfoContainer';
import Nav from './Nav'
// import { Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      <Router>
      <Route exact path="/algoway" component={GridContainer}/>
      <Route exact path="/algorithms" component={UserInfoContainer} />
      </Router>
    </div>
  );
}

export default App;
