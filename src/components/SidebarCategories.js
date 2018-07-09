import React, { Component } from 'react'
// import {Menu, MenuItem} from 'semantic-ui-react'
import CategoriesService from '../Services/CategoriesService';

import styles11 from './style1.css'

export default class SidebarCategories extends Component { 

  constructor(){
    super();
    this.categoriesService = new CategoriesService()
    this.state ={
      categorySelected: "",
      categories: [],
    }
  }

  componentDidMount = async () => {
   
    this.categoriesService.getCategories().then (response =>{
                                                              const categories = response.data;
                                                              this.setState({ categories });
                                                            }
                                                  )  
  }

  handerOnClick(aIdCategory){
    this.props.onClick(aIdCategory) 
    this.props.onAction("Publication")
  }



  
  render() {
    const { activeCategory } = this.state


    return (
// <div className={styles11}>
//  <ul>
//   <li><a class="active" href="#home">Categorias</a></li>
//   {
            
//     this.state.categories.map(aCategory => 
//       <li><a key={aCategory.id} 
//       active={activeCategory === aCategory.id}
//       onClick={()=> this.handerOnClick(aCategory.id)}> {aCategory.name} </a></li>)
//   }
// </ul> 
// </div>

<div className={styles11}>
<nav class="navbar-primary">
  <a class="btn-expand-collapse"><span class="glyphicon glyphicon-menu-left"></span></a>
  <ul class="navbar-primary-menu">
    <li>
    <a><span class="glyphicon glyphicon-cog"></span><span class="nav-label">Categorias</span></a>
       {
            
                this.state.categories.map(aCategory => 
                  <a key={aCategory.id} 
                  active={activeCategory === aCategory.id}
                  onClick={()=> this.handerOnClick(aCategory.id)} >
                  <span class="glyphicon glyphicon-list-alt"></span><span class="nav-label">{aCategory.name}</span></a>
                  
                  
                  )
              }
      
      {/* <a href="#"><span class="glyphicon glyphicon-envelope"></span><span class="nav-label">Profile</span></a>
      <a href="#"><span class="glyphicon glyphicon-cog"></span><span class="nav-label">Settings</span></a>
      <a href="#"><span class="glyphicon glyphicon-film"></span><span class="nav-label">Notification</span></a>
      <a href="#"><span class="glyphicon glyphicon-calendar"></span><span class="nav-label">Monitor</span></a> */}
    </li>
  </ul>
</nav>
</div>

        // <Menu fluid vertical inverted>
        //   <MenuItem name='Categorias' header/>
        //   {
            
        //     this.state.categories.map(aCategory => 
        //       <Menu.Item  key={aCategory.id} 
        //                   active={activeCategory === aCategory.id}
        //                   onClick={()=> this.handerOnClick(aCategory.id)}> 
        //       {aCategory.name} 
        //       </Menu.Item>)
        //   }
        // </Menu>

    )
  }
}

