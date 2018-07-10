import React, { Component } from 'react'
import CategoriesService from '../Services/CategoriesService';

import styles11 from './style1.css'

export default class SidebarCategories extends Component { 

  constructor(){
    super();
    this.categoriesService= new CategoriesService()
    /* this.activeCategory   = -1 */
    this.state ={
      activeCategory  : -1,
      categorySelected: "",
      categories      : [],
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
    const activeCategory  = aIdCategory
    this.setState({activeCategory})
    this.props.onClick(aIdCategory) 
    this.props.onAction("Publication")
  }



  
  render() {
    const activeCategory = this.state.activeCategory
    const self = this

    return (
      <div className={styles11}>
        <ul>
          <li><a className="active">Categorias</a></li>
          {      
            self.state.categories.map(aCategory => 
              <li key ={aCategory.id} ><a key={aCategory.id}
              className={activeCategory === aCategory.id ? 'active' : 'inactive'}
              onClick ={()=> this.handerOnClick(aCategory.id)}> {aCategory.name} </a></li>)
          }
        </ul> 
      </div>
    )
  }
}

