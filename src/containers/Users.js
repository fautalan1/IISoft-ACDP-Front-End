import React, { Component } from 'react'
import axios from 'axios';
import { Segment, Item, Grid } from 'semantic-ui-react'

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
          <Segment inverted  color='blue'  >
              {this.state.users.map(anUser =>
                          <Grid.Row key={anUser.id} > 
                            <Item.Group>
                            <Item>
                              {/* {<Item.Image size='tiny' src='../image/icono.png' />} */}
                        
                              <Item.Content>
                              
                                <Item.Header as='a'> 
                                <p className="" >{anUser.name}</p>
                                </Item.Header>
                                <Item.Description>
                                  <p className="">{anUser.userName } </p>
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