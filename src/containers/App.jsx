import React, { Component } from 'react';
import '../App.css';
import { Switch, Route } from 'react-router-dom';


//Import for route
import Home from './Home';
import Schedule from './Schedule';





export default  class App extends Component {

 
  render() {
    return (
      <div>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route       path='/schedule' component={Schedule}/>
          </Switch>
      </div>
    );
  }
}

