import request from 'superagent'
import React, { Component } from 'react'
import {Menu} from 'semantic-ui-react'

class SidebarCategories extends Component {

  constructor(){
    super();
    this.state ={
      categorySelected: "",
      categories: []
    }
  }

  componentDidMount(){
    request
    .get('http://localhost:8080/categories')
    .then(res => {
      
      let categoriesbase = JSON.parse(res.text)
      console.log(categoriesbase)
      this.setState({
        categories : categoriesbase
      })
    })
    .catch((err) => {
       alert(err)
    });

  }

  menuItem(){ return this.state.categories.forEach((each)=> <Menu.Item> {each.name} </Menu.Item>) }

  handleCategoryClick = (e, {name}) => ( e ) //TODO: Deberia realizar la accion  de traerse las publicaciones de la categoria para mostrarlas
  
  render() {

    const { activeCategory } = this.state

    return (
      <Menu fluid vertical inverted>
          <ul>
            {this.state.categories.map(x => <li key= {x.id} ><Menu.Item active={activeCategory === x.name} onClick={this.handleCategoryClick}> {x.name} </Menu.Item></li>)}
          </ul>
      </Menu>
    )
  }
}

export default SidebarCategories