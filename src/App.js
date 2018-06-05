import React, { Component } from 'react';
import request from 'superagent'
import './App.css';
import SidebarCategories from '../src/components/SidebarCategories';
import Header from '../src/components/Header';
import Main from '../src/components/Main';
import CategoriesPublicationList from '../src/components/CategoriesPublicationList';
import { Grid, GridColumn} from 'semantic-ui-react';

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
      <div>
        <Header />
        <Grid stretched>
          <GridColumn style={{width: '15%', height:'100vh'}}>
            <SidebarCategories/>
          </GridColumn>
          <GridColumn style={{width: '85%', height:'100vh'}}>
             {/*TODO: el Categories Publication List deberia ser puesto por un ruote dentro del tag main  */}
            <CategoriesPublicationList/>
            <Main />
          </GridColumn>
        </Grid>
      </div>
    );
  }
}

export default App;
