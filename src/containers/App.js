import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import Header from '../components/Header';
import axios from 'axios';

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
      redirectToReferrer: true, 
      user: {},
      name: "",     
      argsSignup: {},
    }
  }

  login = () => {
    this.setState(() => ({
      redirectToReferrer: false
    }))
  }

  verify = () => {
    axios.get('http://localhost:8080/user/' + this.state.name)
    .then(response => {
      const user = response.data;
      this.setState({ user });
      this.login();
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleChange = (ev, input)=>{
    const argsSignup = this.state.argsSignup
    argsSignup[input.name] = input.value
    this.setState({ name: argsSignup.name})
  }

  render() {
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <div>
          <Login verify={this.verify} handleChange={this.handleChange}/>
        </div>
      )
    }

    return (
      <div>
          <Header anUserName={this.state.name}/>
          <Switch>
            <Route exact path="/" render={()=><Home anUserName={this.state.name}/>}/>
            <Route exact path='/perfil/:userName' component={Perfil}/>
            <Route exact path='/user/:userName' component={Perfil}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/usuarios' component={Users}/>
            <Route       path='/schedule' component={Schedule}/>
            <Route       path='/newPublication' component={NewPublication}/>
          </Switch>
      </div>
    );
  }
}

