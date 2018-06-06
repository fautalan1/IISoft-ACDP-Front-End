import React from 'react';
import {Grid} from 'semantic-ui-react';
import Header from '../components/Header';
import SidebarCategories  from '../components/SidebarCategories';
import ListPublication from '../components/ListPublication'

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

class Home extends React.Component{
  constructor(){
    super();
    this.state ={
      category: false,
      idCategoria: -1
    }
  }

  onAction=(aIdCategory)=>{
    //Fijarse como pasar parametros de hijo a padre, el aIDCAtegorias es undefine
    this.setState({
      category:true,
    })
  }



  view(){
    let props = { 
                  f : () => this.onAction(),
                  idCategoria: this.state.idCategoria,
                  padre:this

                }
    if(!this.state.category){
      return <OnlyCategory onClick= {props} />
      }else{
        return <CategoryAndPublication onClick= {props} />
      }
  }


  render(){
    return (
      <div>
        <Header/>
        {this.view()}
      </div>
    )
  }
}

export default Home


const OnlyCategory=(props) => (

    
        <Grid verticalAlign='middle' columns={2}>
            <Grid.Row>
              <Grid.Column style={styles.grid}>
                <SidebarCategories onClick= {props} />
              </Grid.Column>
            </Grid.Row>
        </Grid>
)
   

const CategoryAndPublication =(props)=>(

      <Grid verticalAlign='middle' columns={2}>
        <Grid.Row>
          <Grid.Column style={styles.grid}>
            <SidebarCategories onClick= {props} />
          </Grid.Column>
          <Grid.Column style={styles.grid}>
            <ListPublication onClick= {props} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
)

