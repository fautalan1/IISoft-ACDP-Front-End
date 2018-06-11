import React from 'react';
import {Grid} from 'semantic-ui-react';
import Header from '../components/Header';
import SidebarCategories  from '../components/SidebarCategories';
import ListPublication from '../components/ListPublication'
import PublicationComentaries from '../components/PublicationComentaries'

const styles={
  grid: {
    height:'100%',
    width: '15%'

  },
  box:{
    backgroundColor: 'white',
    border: '1px solid #e6e6e6',
    textAlign: 'center',
    marginBottom: '1em',
    padding: '1em',
  }
}

export default class Home extends React.Component{
  constructor(){
    super();
    this.state ={
      stateS: "",
      idPublication: -1,
      idCategoria: -1
    }
  }

   onAction=async(newStateS)=>{
    this.setState({
      stateS:newStateS
    })

  }
  changeIdPublication=(newIdPublication)=>{
    this.setState({
      idPublication:newIdPublication
    })
  }

  changeIdCategory(newIdCategory){
    this.setState({
      idCategoria : newIdCategory
    })

  }
 
  show=(anEnum) =>{
    
      if("Publication" ===  anEnum){
        return (
        
        <Grid verticalAlign='middle' columns={3}>
        <Grid.Row>
          <Grid.Column style={styles.grid}>
            <SidebarCategories onClick= {(newIdCategory)=>this.changeIdCategory(newIdCategory)}
                               onAction= {(newStateS)=>this.onAction(newStateS) } />
          </Grid.Column>
          <Grid.Column style={styles.grid}>
            <ListPublication idCategory= {this.state.idCategoria}
                             /* onAction= {(newStateS)=>this.onAction(newStateS)} */
                             /* onChange={(newIdPublication)=>this.changeIdPublication(newIdPublication)} */
                             changeStateToComentaryHandler={(aPublicationID)=>this.changeStateToComentaryHandler(aPublicationID)}/>
          </Grid.Column>
        </Grid.Row>
        </Grid> 
         
       ) 
      }
      else if("Comentary" === anEnum) {
        return (
      
          <Grid verticalAlign='middle' columns={3} stretched >
            <Grid.Row>
              <Grid.Column style={styles.grid} >
              <SidebarCategories onClick= {(newIdCategory)=>this.changeIdCategory(newIdCategory)}
                                onAction= {(newStateS)=>this.onAction(newStateS) } />
              </Grid.Column>

              <Grid.Column style={styles.grid}>
              <ListPublication idCategory= {this.state.idCategoria}
                              /* onAction= {(newStateS)=>this.onAction(newStateS)} */
                              /* onChange={(newIdPublication)=>this.changeIdPublication(newIdPublication)} */
                              changeStateToComentaryHandler={(aPublicationID)=>this.changeStateToComentaryHandler(aPublicationID)}/>
              </Grid.Column>

              <Grid.Column style={styles.grid}>
                <PublicationComentaries idPublication= {this.state.idPublication} 
                                /* onAction= {(newStateS)=>this.onAction(newStateS) } *//>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          
        )  
      }
      else {
        return(
          
          <Grid verticalAlign='middle' columns={3}>
          <Grid.Row>
            <Grid.Column style={styles.grid}>
            <SidebarCategories onClick= {(newIdCategory)=>this.changeIdCategory(newIdCategory)}
                               onAction= {(newStateS)=>this.onAction(newStateS) } />
            </Grid.Column>
          </Grid.Row>
          </Grid>
          
        ) 
      }

  }

  render(){

    return (
      <div>
        <Header/>
        {this.show(this.state.stateS)} 
      </div>
    )
  }

  changeStateToComentaryHandler=(aPublicationID)=>{ 
                                                    this.setState({ idPublication :aPublicationID,
                                                                    stateS        :"Comentary"}) }

}