import React, { Component } from 'react';
import request from 'superagent'
import '../App.css';
import { Switch, Route } from 'react-router-dom';
//Import for route
import Home from './Home';
import Schedule from './Schedule';






export default  class App extends Component {
 constructor(){
   super();
   this.state ={
     user: ""
   }
 }

  componentDidMount(){
    request
    .get('http://localhost:8080/user')
    .then(res => {
      let user = JSON.parse(res.text)
      this.setState({
        user : user.name
      })
    })
    .catch((err) => {
       alert(err)
    });

  }
  
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

