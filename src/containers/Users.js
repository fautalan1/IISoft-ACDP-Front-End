import React, { Component } from 'react'
import { Segment, Item, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import UserService from '../Services/UserService'
export default class Home extends Component {

    constructor() { 
        super();
        this.state = {
            users: []
        }
    }

    setUsers = async () => { 
      const userService = new UserService()
      
      userService.getAllUsers().then(response => {
          const users = response.data;
          this.setState({ users });
        })
    }

    componentDidMount = () => {
        this.setUsers()
    }
  
    changePerfil=(userPerfil)=>{
      let servi =new UserService()
      servi.setUserPerfil(userPerfil)
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
                              
                                <Item.Header onClick={()=>this.changePerfil(anUser.userName)}> 
                                <Link to='/perfil'>{anUser.userName}</Link>
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