import React from 'react';
import {Grid} from 'semantic-ui-react';
import SidebarCategories  from '../components/SidebarCategories';
import ListPublication from '../components/ListPublication'
import PublicationComentaries from '../components/PublicationComentaries'

const styles={
  gridSidebar: {
    height:'100vh',
    width: '25.8vh',
    backgroundColor: 'rgb(31, 31, 31)'
  },
  gridPublication: {
    height:'100vh',
    width: '42%'
  },
  gridCommentary: {
    height:'100vh',
    width: '42%'
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
  constructor(props){
    super(props);
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

  changeStateToComentaryHandler=(aPublicationID)=>{ 
    this.setState({ idPublication :aPublicationID,
                    stateS        :"Comentary"}) }

 
  show=(anEnum) =>{
    
      if("Publication" ===  anEnum){
        return (
        
        <Grid columns={3} style={{height:'80vh'}}>
        <Grid.Row >
          <Grid.Column style={styles.gridSidebar}>
            <SidebarCategories onClick= {(newIdCategory)=>this.changeIdCategory(newIdCategory)}
                               onAction= {(newStateS)=>this.onAction(newStateS) } />
          </Grid.Column>
          <Grid.Column style={styles.gridPublication}>
            <ListPublication idCategory= {this.state.idCategoria}
                             changeStateToComentaryHandler={(aPublicationID)=>this.changeStateToComentaryHandler(aPublicationID)}
                             anUser={this.props.anUserName}/>
          </Grid.Column>
        </Grid.Row>
        </Grid> 
         
       ) 
      }
      else if("Comentary" === anEnum) {
        return (
      
          <Grid columns={3}>
            <Grid.Row  style={{height:'80vh'}}>
              <Grid.Column style={styles.gridSidebar}>
              <SidebarCategories onClick= {(newIdCategory)=>this.changeIdCategory(newIdCategory)}
                                onAction= {(newStateS)=>this.onAction(newStateS) } />
              </Grid.Column>

              <Grid.Column style={styles.gridPublication}>
              <ListPublication idCategory= {this.state.idCategoria}
                              changeStateToComentaryHandler={(aPublicationID)=>this.changeStateToComentaryHandler(aPublicationID)}
                              anUser={this.props.anUserName}/>
              </Grid.Column>

              <Grid.Column style={styles.gridCommentary}>
                <PublicationComentaries idPublication= {this.state.idPublication} anUser={this.props.anUserName}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          
        )  
      }
      else {
        return(
          
          <Grid columns={3} style={{height:'80vh'}}>
          <Grid.Row >
            <Grid.Column style={styles.gridSidebar}>
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
        {this.show(this.state.stateS)} 
      </div>
    )
  }


}