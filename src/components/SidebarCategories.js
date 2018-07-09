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
      <div className={styles11}>
        <ul>
          <li><a class="active">Categorias</a></li>
          {
                    
            this.state.categories.map(aCategory => 
              <li><a key={aCategory.id}  
              active={activeCategory === aCategory.id}
              onClick={()=> this.handerOnClick(aCategory.id)}> {aCategory.name} </a></li>)
          }
        </ul> 
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

