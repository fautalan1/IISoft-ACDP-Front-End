import React, { Component } from 'react'
import axios from 'axios';

export default class Home extends Component {

    constructor() { 
        super();
        this.state = {
            user: ""
        }
    }

    setUser = async () => { 
        axios.get(`http://localhost:8080/user`)
        .then(response => {
          const user = response.data;
          this.setState({ user });
        })
    }

    componentDidMount = () => {
        this.setUser()
    }

    render(){
        return (
          <div>
              {this.state.user.userName}           
          </div>
        )
      }
}