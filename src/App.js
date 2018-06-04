import React, { Component } from 'react';
import request from 'superagent'
import './App.css';
import SidebarCategories from '../src/components/SidebarCategories';
import MenuTop from '../src/components/MenuTop';
import CategoriesPublicationList from '../src/components/CategoriesPublicationList';
import PublicationComentaries from '../src/components/PublicationComentaries';
import { Grid, GridColumn, GridRow} from 'semantic-ui-react';

class App extends Component {
 constructor(){
   super();
   this.state ={
     user: ""
   }
 }

  componentDidMount(){
    request
    .get('http://localhost:8080/user')
    .then(res => {
      let user = JSON.parse(res.text)
      this.setState({
        user : user.name
      })
    })
    .catch((err) => {
       alert(err)
    });

  }
  
  render() {
    return (
      <Grid>
        <GridRow>
          <GridColumn floated='right'>
            <img src="UNQ Black Logo.png" alt="UNQ Black Logo"></img>
          </GridColumn>
          <GridColumn width='14'>
            <MenuTop/>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn width='2' >
            <SidebarCategories/>
          </GridColumn>
          <GridColumn width='14'>
            {/* <CategoriesPublicationList/>  */}
            <PublicationComentaries/>
          </GridColumn>
        </GridRow>
      </Grid>
    );
  }
}

export default App;
