import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Menu, Image } from 'semantic-ui-react'

export default class Header extends Component {
  state = { activeItem: '/' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      
        <Menu inverted attached='top'>
          <Menu.Item icon > 
            <Image size="mini" src="../UNQ Black Logo.png" />
          </Menu.Item>
          
          <Menu.Item as={Link} to='/' name='Home'/>
          <Menu.Item as={Link} to='/perfil' name='Perfil'/>
          <Menu.Item as={Link} to='/usuarios' name='Users'/>
          <Menu.Item as={Link} to='/schedule' name='Schedule'/>
          
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
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
