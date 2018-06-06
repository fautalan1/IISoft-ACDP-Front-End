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
    this.props.onClick.onClick.padre.setState({
      idCategoria: aIdCategory
    })

    this.props.onClick.onClick.f(aIdCategory)
  }

  
  render() {

    const { activeCategory } = this.state

    return (


        <Menu fluid vertical inverted>
          <MenuItem name='Categorias' header />
          {
            
            this.state.categories.map(aCategory => 
              <Menu.Item  key={aCategory.id} active={activeCategory === aCategory.id} onClick={()=> this.xxx(aCategory.id) } > 
              {aCategory.name} 
              <div style={{width: '15%', height:'100%'}}>
                {this.state.viewPublication}
              </div>
              </Menu.Item>)
          }
        </Menu>
    
    )
  }
}

