import React, { Component } from 'react';
import request from 'superagent'
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bienvenido Diego</h1>
        </header>
          <h1>Ella es mi querida: {this.state.user}</h1>
      </div>
    );
  }
}

export default App;
