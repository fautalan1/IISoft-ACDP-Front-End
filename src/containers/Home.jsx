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

export default class Home extends React.Component{
  constructor(){
    super();
    this.state ={
      category: false,
      idCategoria: -1,
      stateR: () => this.initialState()
    }
  }

  onAction=(aIdCategory)=>{
    //Fijarse como pasar parametros de hijo a padre, el aIDCAtegorias es undefine
    console.log(aIdCategory)
    this.setState({
      idCategoria: aIdCategory,
      stateR: () => this.updateState()
    })
  }

  initialState= () =>{
    let props = {
      idCategoria: this.state.idCategoria,
      onUpdate: (aIdCategory) => this.onAction(aIdCategory)
    }
    return <OnlyCategory onClick= {props} />
  }

  updateState=() =>{
    console.log("Me llamaron")
    let props = {
      idCategoria: this.state.idCategoria,
      onUpdate: (aIdCategory) => this.onAction(aIdCategory)
    }
    return <CategoryAndPublication onClick= {props} />
  }

  render(){
    return (
      <div>
        <Header/>
        {this.state.stateR()}
      </div>
    )
  }
}




const OnlyCategory=(props) => (

        <Grid verticalAlign='middle' columns={2}>
            <Grid.Row>
              <Grid.Column style={styles.grid}>
                <SidebarCategories onClick= {(aIdCategory)=>props.onClick.onUpdate(aIdCategory)} />
              </Grid.Column>
            </Grid.Row>
        </Grid>
)
const CategoryAndPublication =(props)=>(

      <Grid verticalAlign='middle' columns={2}>
        <Grid.Row>
          <Grid.Column style={styles.grid}>
            <SidebarCategories onClick= {(aIdCategory)=>props.onClick.onUpdate(aIdCategory)} />
          </Grid.Column>
          <Grid.Column style={styles.grid}>
            <ListPublication idCategory= {props.onClick.idCategoria} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
)


