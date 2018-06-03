import request from 'superagent'
import React, { Component } from 'react'
import { Sidebar, Menu} from 'semantic-ui-react'

class SidebarLeftPush extends Component {

  constructor(){
    super();
    this.state ={
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

  

  render() {

    return (
      <div>
          <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical inverted>

           <ul>
                {this.state.categories.map(x => <li key= {x.id} ><Menu.Item> {x.name} </Menu.Item></li>)}
           </ul>
          </Sidebar>

      </div>
    )
  }
}

export default SidebarLeftPush