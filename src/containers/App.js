import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import Header from '../components/Header';
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import Home from './Home';
import Perfil from './Perfil'
import Login from './Login'
import Users from './Users'

import EditProfilePersonal    from './EditProfilePersonal'
import EditProfileProfesional from './EditProfileProfesional'

import UserService from '../Services/UserService'
import SessionService from '../Services/SessionService';
import Register from './Register'

export default class App extends Component {
  
  constructor(){
    super();
    this.sessionService = new SessionService()
    this.state = {
      redirectToReferrer: this.sessionService.verifyRedirectToReferrer(), 
      name: "",
      password: "",     
      argsSignup: {},
    }
  }

  login = () => {
    this.setState(() => ({
      redirectToReferrer: false
    }))
    this.getUser()
  }

  logout = () => {
    this.sessionService.removeToken()
    this.setState(() => ({
      redirectToReferrer: true
    }))
  }

  createNotification = () => {
    NotificationManager.error('Username or Password Incorrect', 'Alert', 5000, () => {
      alert('callback')
    })
  }

  verify = async () => {
    const userService = new UserService()
    var self  = this

    userService.logIn(this.state.name, this.state.password).then(response => 
                                                {
                                                  self.sessionService.setToken(response.data)
                                                  self.login()
                                                }
                                              )
                                        .catch(err => { self.createNotification() } )
  }

  getUser = async () => {
    const userService = new UserService()
    var self  = this

    userService.getUser(this.state.name).then(response => 
                                                {
                                                  const user = response.data
                                                  userService.SetUser(user)
                                                }
                                              )
                                        .catch(err => { self.createNotification() } )
  }

  handleChange = (ev, input)=>{
    const argsSignup = this.state.argsSignup
    argsSignup[input.name] = input.value
    this.setState({ [input.name]: argsSignup[input.name]})
  }

  render() {
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <div>
          <Login verify={this.verify} handleChange={this.handleChange}/>
          <NotificationContainer/>
        </div>
      )
    }

    return (
      <div>
          <Header anUserName={this.state.name} logout={this.logout}/>
          <Switch>
            <Route exact path="/"                          render    ={()=><Home anUserName={this.state.name}/>}/>
            <Route exact path='/perfil'                    component ={Perfil}/>
            <Route exact path='/editProfilePersonal'       component ={EditProfilePersonal}/>
            <Route exact path='/editProfileProfesional'    component ={EditProfileProfesional}/>
            <Route exact path='/login'                     component ={Login}/>
            <Route exact path='/usuarios'                  component ={Users}/>
            <Route exact path='/register'                  component ={Register}/>
          </Switch>
      </div>
    );
  }
}

