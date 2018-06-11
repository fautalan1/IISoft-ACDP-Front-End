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

  async componentDidMount(){
    
    try{
     const data = await fetch('http://localhost:8080/categories');
     const posts= await data.json();
     console.log(posts)
      this.setState({
        categories : posts
      })
      return null
    }catch(err){
      alert(err)
   }



    
  }

  xxx(aIdCategory){
    //Esto lo deberia hacer el padre pero al no tener una forma de pasarle el id use esto.

    //console.log(this.props.onClick(aIdCategory))
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
                          onClick={()=> this.xxx(aCategory.id)}> 
              {aCategory.name} 
              </Menu.Item>)
          }
        </Menu>
    
    )
  }
}

