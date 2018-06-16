import React, { Component } from 'react'
import axios from 'axios';
import { Segment, Item, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class Home extends Component {

    constructor() { 
        super();
        this.state = {
            users: []
        }
    }

    setUsers = async () => { 
        axios.get(`http://localhost:8080/users`)
        .then(response => {
          const users = response.data;
          this.setState({ users });
        })
    }

    componentDidMount = () => {
        this.setUsers()
    }

    render(){
        return (
          <Segment inverted  color='yellow'  >
              {this.state.users.map(anUser =>
                          <Grid.Row key={anUser.userName} > 
                            <Item.Group>
                            <Item>
                              {/* {<Item.Image size='tiny' src='../image/icono.png' />} */}
                        
                              <Item.Content>
                              
                                <Item.Header> 
                                <Link to={'/user/' + anUser.userName}>{anUser.userName}</Link>
                                </Item.Header>
                                <Item.Description>
                                  <p className="">{anUser.name } </p>
                                </Item.Description>
  
                                <Item.Extra>
                                  
                                  <div className="">{Date(anUser.date)}</div>
                                </Item.Extra>
                            
                              </Item.Content>
                            </Item>
                          </Item.Group>
                        </Grid.Row>
              )}
            
  
          </Segment>
        )
      }

}