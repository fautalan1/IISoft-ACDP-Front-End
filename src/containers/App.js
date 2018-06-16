import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import Header from '../components/Header';

import Home from './Home';
import Schedule from './Schedule';
import NewPublication from './NewPublication'
import Perfil from './Perfil'
import Login from './Login'
import Users from './Users'

export default class App extends Component {

  constructor(){
    super();
    this.state = {
      redirectToReferrer: true
    }
  }

  login = () => {
    this.setState(() => ({
      redirectToReferrer: false
    }))
  }

  render() {
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <div>
          <Login reg={this.redirectToReferrer} log={this.login}/>
        </div>
      )
    }

    return (
      <div>
          <Header/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/perfil' component={Perfil}/>
            <Route exact path='/usuarios' component={Users}/>
            <Route       path='/schedule' component={Schedule}/>
            <Route       path='/newPublication' component={NewPublication}/>
          </Switch>
      </div>
    );
  }
}


