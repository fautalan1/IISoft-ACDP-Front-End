import React, { Component } from 'react';
import '../App.css';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/Header';

//Import for route
import Home from './Home';
import Schedule from './Schedule';
import NewPublication from './NewPublication'





export default  class App extends Component {

 
  render() {
    return (
      <div>
          <Header/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route       path='/schedule' component={Schedule}/>
            <Route       path='/newPublication' component={NewPublication}/>
          </Switch>
      </div>
    );
  }
}

