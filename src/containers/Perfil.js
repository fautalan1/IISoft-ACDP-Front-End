import React, { Component } from 'react'
import axios from 'axios';

export default class Home extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            user: ""
        }
    }

    setUser = async () => { 
        axios.get('http://localhost:8080/user/' + this.props.match.params.userName)
        .then(response => {
          const user = response.data;
          this.setState({ user });
        })
    }

    componentDidMount = () => {
        this.setUser()
    }

    componentDidUpdate=(prevProps, prevState) => {
        if(prevProps.match.params.userName !== this.props.match.params.userName) { 
            this.setUser()
        }
    }

    render(){
        return (
          <div>
              {this.state.user.userName}           
          </div>
        )
      }
}