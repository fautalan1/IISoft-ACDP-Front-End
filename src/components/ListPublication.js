import React, { Component } from 'react';
import {List, Button, Grid} from 'semantic-ui-react';


export default class ListPublication extends Component {

  constructor(props){
    super();
    console.log("Construyo")
    this.list =[]
    this.state ={
      category: "",
      publication: []
    }
  }

  async setPublicationByIdCategory (idCategory){
    console.log("Pego a Api")
    console.log("Mi id es:" + this.state.category)
    console.log("La id es de props es:" + idCategory)
    try{
      const promise = await fetch('http://localhost:8080/publication/' + idCategory)
      const posts= await promise.json();
      console.log("promesa")
      console.log(posts)
      this.setState({
        category: idCategory,
        publication : posts
       })
       return null
     }catch(err){
       alert(err)
    }

  }

  componentDidMount=()=>{
    console.log("Did Mount")
    console.log(this.props.idCategory)
    this.setPublicationByIdCategory(this.props.idCategory)
  }

  //Es para saver si hay que actualizar o no, comparo el nuevo state y props contra los viejos, si alguno es distinto debo actualizar
  shouldComponentUpdate=(nextProps, nextState)=>{
    console.log("Should Update?")
    return (nextProps.idCategory !== this.props.idCategory) || (nextState.category !== this.state.category)
  }    

  componentDidUpdate=(prevProps, prevState)=>{
    console.log("Did Update")
    console.log(this.props.idCategory)
    //Se Chequea las props nuevas contra las viejas para asegurarse si hay que actualizar
    if (prevProps.idCategory !== this.props.idCategory)
    { 
      console.log("ACTUALIZO!!!")
      this.setPublicationByIdCategory(this.props.idCategory) 
    }
  }

  render() {
    console.log("Hago Render")
    return (
      <List>
        {this.state.publication.map(x =>
                                    <Grid.Row key={x.id}>
                                      <List.Item>
                                          <List.Content>
                                            <List.Header as='a'>{x.title}</List.Header>
                                            <List.Description>
                                              Creado por {' '} <a>{x.whoPublishedIt}</a>{' '}.
                                            </List.Description>
                                            <List.Description>
                                              {(x.date)}
                                            </List.Description>
                                            <Button onClick={()=>this.props.changeStateToComentaryHandler(x.id)}>Ver Comentarios</Button>
                                          </List.Content>
                                        </List.Item>
                                      </Grid.Row>)}
      </List>
    )
  }

}
