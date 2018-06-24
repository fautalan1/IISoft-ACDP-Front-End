import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import Header from '../components/Header';
//import decode from 'jwt-decode';
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

import Home from './Home';
import Schedule from './Schedule';
import Perfil from './Perfil'
import Login from './Login'
import Users from './Users'
import UserService from '../Services/UserService'

export default class App extends Component {

  constructor(){
    super();
    this.state = {
      redirectToReferrer: this.verifyRedirectToReferrer(), 
      user: {},
      name: "",
      password: "",     
      argsSignup: {},
    }
  }

  verifyRedirectToReferrer = () => {
    const aToken = JSON.parse(localStorage.getItem('token'))
    const aBool = !aToken || this.isTokenExpired(aToken)
    return aBool
  }

  isTokenExpired(token) {
    try {
        const dateNow = new Date()
        return token.exp < dateNow.getTime()
    }
    catch (err) {
        return false
    }
}

  login = () => {
    this.setState(() => ({
      redirectToReferrer: false
    }))
    this.getUser()
  }

  noLogin = () => {
    localStorage.removeItem('token')
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
    
    userService.logIn(this.state.name, this.state.password).then(response => 
                                                {
                                                  const aToken = JSON.stringify(response.data)
                                                  localStorage.setItem('token', aToken)
                                                  this.login()
                                                }
                                              )
                                        .catch(err => { this.createNotification() } )
  }

  getUser = async () => {
    const userService = new UserService()
    
    userService.getUser(this.state.name).then(response => 
                                                {
                                                  const user = response.data
                                                  userService.SetUser(user)
                                                  this.setState({ user })
                                                  this.setState({name: user.userName})
                                                  this.login()
                                                }
                                              )
                                        .catch(err => { this.createNotification() } )
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
          <Header anUserName={this.state.name} noLogin={this.noLogin}/>
          <Switch>
            <Route exact path="/" render={()=><Home anUserName={this.state.name}/>}/>
            <Route exact path='/perfil/:userName' component={Perfil}/>
            <Route exact path='/user/:userName' component={Perfil}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/usuarios' component={Users}/>
            <Route       path='/schedule' component={Schedule}/>
          </Switch>
      </div>
    );
  }
}

