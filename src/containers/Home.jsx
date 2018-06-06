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
  async changeIdCategory(newIdCategory){
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
            <SidebarCategories onClick1= {(newIdCategory)=>this.changeIdCategory(newIdCategory)}
                               onAction= {(newStateS)=>this.onAction(newStateS) } />
          </Grid.Column>
          <Grid.Column style={styles.grid}>
            <ListPublication idCategory= {this.state.idCategoria}
                             onAction= {(newStateS)=>this.onAction(newStateS)}
                             onChange={(newIdPublication)=>this.changeIdPublication(newIdPublication)}/>
          </Grid.Column>
        </Grid.Row>
        </Grid> 
         
       ) 
      }
      else if("Comentary" === anEnum) {
        return (
      
          <Grid verticalAlign='middle' columns={3}>
          <Grid.Row> 
            <Grid.Column style={styles.grid}>
            <SidebarCategories onClick1= {(newIdCategory)=>this.changeIdCategory(newIdCategory)}
                               onAction= {(newStateS)=>this.onAction(newStateS) } />
            </Grid.Column>

            <Grid.Column style={styles.grid}>
            <ListPublication idCategory= {this.state.idCategoria}
                             onAction= {(newStateS)=>this.onAction(newStateS)}
                             onChange={(newIdPublication)=>this.changeIdPublication(newIdPublication)}/>
            </Grid.Column>

            <Grid.Column style={styles.grid}>
              <PublicationComentaries idCategory= {this.props.onClick.idCategoria} 
                               onAction= {(newStateS)=>this.onAction(newStateS) }/>
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
            <SidebarCategories onClick1= {(newIdCategory)=>this.changeIdCategory(newIdCategory)}
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
}




// const OnlyCategory=(props) => (

//         <Grid verticalAlign='middle' columns={2}>
//             <Grid.Row>
//               <Grid.Column style={styles.grid}>
//                 <SidebarCategories onClick= {(aIdCategory)=>props.onClick.onUpdate(aIdCategory)} />
//               </Grid.Column>
//             </Grid.Row>
//         </Grid>
// )
// const CategoryAndPublication=(props)=>(

      
//       <Grid verticalAlign='middle' columns={2}>
//         <Grid.Row>
//           <Grid.Column style={styles.grid}>
//             <SidebarCategories onClick= {(aIdCategory)=>props.onClick.onUpdate(aIdCategory)} />
//           </Grid.Column>
//           <Grid.Column style={styles.grid}>
//             <ListPublication idCategory= {props.onClick.idCategoria} />
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
// )


// class ShowItems extends React.Component{
//   constructor(){
//     super();
//     this.state ={
//       stateS: "",
//       idPublication: -1,
//       idCategoria: -1
//     }
//   }

//   onAction=(newStateS)=>{
//     this.setState({
//       stateS:newStateS
//     })
//   }
//   changeIdPublication=(newIdPublication)=>{
//     this.setState({
//       idPublication:newIdPublication
//     })
//   }
//   changeIdCategory=(newIdCategory)=>{
//     this.setState({
//       idCategoria: newIdCategory
//     })
//   }
 
//   show=(anEnum) =>{
//     switch(anEnum){
//       case 'Publication':
//         return
//         <div>
//           <Grid.Column style={styles.grid}>
//             <SidebarCategories onClick= {(aIdCategory)=>this.changeIdCategory(aIdCategory)}
//                                onAction= {(newStateS)=>this.onAction(newStateS) } />
//           </Grid.Column>
//           <Grid.Column style={styles.grid}>
//             <ListPublication
//                              onAction= {(newStateS)=>this.onAction(newStateS)}
//                              onChange={(newIdPublication)=>this.changeIdPublication(newIdPublication)}/>
//           </Grid.Column>
//         </div>  
//       case 'Comentary':
//         return 
//           <div>
//             <Grid.Column style={styles.grid}>
//             <SidebarCategories onClick= {(aIdCategory)=>this.changeIdCategory(aIdCategory)}
//                                onAction= {(newStateS)=>this.onAction(newStateS) } />
//             </Grid.Column>
//             <Grid.Column style={styles.grid}>
//             <ListPublication
//                              onAction= {(newStateS)=>this.onAction(newStateS)}
//                              onChange={(newIdPublication)=>this.changeIdPublication(newIdPublication)}/>>
//             </Grid.Column>
//             <Grid.Column style={styles.grid}>
//               <ListPublication idCategory= {this.props.onClick.idCategoria} 
//                                onAction= {(newStateS)=>this.onAction(newStateS) }/>
//             </Grid.Column>
//           </div>
//       default :
//         return 
//           <div>
//             <Grid.Column style={styles.grid}>
//             <SidebarCategories onClick= {(aIdCategory)=>this.changeIdCategory(aIdCategory)}
//                                onAction= {(newStateS)=>this.onAction(newStateS) } />
//             </Grid.Column>
//           </div>
//     }

//   }

      
//   render(){
//     return(
//       <Grid verticalAlign='middle' columns={3}>
//         <Grid.Row>  
//           {this.show(this.state.stateS)}
//         </Grid.Row>
//       </Grid>
//   )}
// }



// var Show={

//   Category,
//   Publication,
//   Comentary  

// };