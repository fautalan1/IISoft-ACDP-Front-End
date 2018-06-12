import React, { Component } from 'react'
import {Menu, MenuItem} from 'semantic-ui-react'
import axios from 'axios';
export default class SidebarCategories extends Component {

  constructor(){
    super();
    this.state ={
      categorySelected: "",
      categories: [],
    }
  }

  componentDidMount=async()=>{
    axios.get('http://localhost:8080/categories')
    .then(response => {
      const categories = response.data;
      this.setState({ categories });
    })  
  }

  handerOnClick(aIdCategory){
    this.props.onClick(aIdCategory) 
    this.props.onAction("Publication")
  }

  
  render() {

    const { activeCategory } = this.state

    return (


        <Menu fluid vertical inverted>
          <MenuItem name='Categorias' header />
          {
            
            this.state.categories.map(aCategory => 
              <Menu.Item  key={aCategory.id} 
                          active={activeCategory === aCategory.id}
                          onClick={()=> this.handerOnClick(aCategory.id)}> 
              {aCategory.name} 
              </Menu.Item>)
          }
        </Menu>
    
    )
  }
}

