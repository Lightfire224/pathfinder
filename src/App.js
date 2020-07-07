import React from 'react';
import './App.css';
import GridContainer from './GridContainer';
import UserInfoContainer from './UserInfoContainer';
import Nav from './Nav'
import ShowPage from './ShowPage'
// import { Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SortingContainer from './SortingContainer'

function App() {
  return (
    <div className="App">
      
      <Router>
      <Route component={Nav}/>
      <Route exact path="/algorhythm" component={SortingContainer}/>
      <Route exact path="/algoway" component={GridContainer}/>
      <Route exact path="/algorithms/:id" component={ShowPage}/>
      <Route exact path="/algorithms" component={UserInfoContainer} />
      </Router>
    </div>
  );
}

export default App;
