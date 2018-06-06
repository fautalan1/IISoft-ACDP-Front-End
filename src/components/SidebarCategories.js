import request from 'superagent'
import React, { Component } from 'react'
import {Menu, MenuItem} from 'semantic-ui-react'

export default class SidebarCategories extends Component {

  constructor(){
    super();
    this.state ={
      categorySelected: "",
      categories: [],
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

  xxx(aIdCategory){
    //Esto lo deberia hacer el padre pero al no tener una forma de pasarle el id use esto.
    console.log("Este es el id:" + aIdCategory)
    console.log(this.props)
    this.props.onClick(aIdCategory) 
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
                          onClick={()=> this.xxx(aCategory.id)}> 
              {aCategory.name} 
              </Menu.Item>)
          }
        </Menu>
    
    )
  }
}

