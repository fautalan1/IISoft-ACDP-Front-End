import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Menu, Image } from 'semantic-ui-react'
import UserService from '../Services/UserService';

export default class Header extends Component {

  constructor(props) { 
    super(props);
    this.state = {
      activeItem: '/'
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.logout()
  }

  changePefil=()=>{
    let servi = new UserService()
    servi.setUserPerfil(servi.GetUserLogged().userName)
  }

  render() {
    const { activeItem } = this.state

  
    return (
      
        <Menu inverted attached='top'>
          <Menu.Item icon > 
            <Image size="mini" src="../UNQ Black Logo.png" />
          </Menu.Item>
          
          <Menu.Item as={Link} to='/'                                    name='Home'/>
          <Menu.Item onClick={()=>this.changePefil()} as={Link} to='/perfil'                               name='Perfil'/>
          <Menu.Item as={Link} to='/usuarios'                           name='Users'/>
          <Menu.Item as={Link} to='/register'                           name='Registrar Usuario'/>
{/*           <Menu.Item as={Link} to='/schedule' name='Schedule'/>
          
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          /> */}
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search Publications...' />
            </Menu.Item>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
    )
  }
}
