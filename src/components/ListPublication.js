import React, { Component } from 'react';
import {List, Button, Grid} from 'semantic-ui-react';
import axios from 'axios';

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
  


   setPublicationByIdCategory=async(anIdCategory)=>{
    axios.get('http://localhost:8080/publication/' + anIdCategory)
    .then(response => {
      const publication = response.data;
      this.setState({ category:anIdCategory,
                      publication  });
    })

  }

  componentDidMount=()=>{
 
    console.log(this.props.idCategory)
    this.setPublicationByIdCategory(this.props.idCategory)
  }

  //Es para saver si hay que actualizar o no, comparo el nuevo state y props contra los viejos, si alguno es distinto debo actualizar
  shouldComponentUpdate=(nextProps, nextState)=>{

    return (nextProps.idCategory !== this.props.idCategory) || (nextState.category !== this.state.category)
  }    

  componentDidUpdate=(prevProps, prevState)=>{
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
        {this.state.publication.map(aPublication =>
                                    <Grid.Row key={aPublication.id}>
                                      <List.Item>
                                          <List.Content>
                                            <List.Header as='a'>{aPublication.title}</List.Header>
                                            <List.Description>
                                              Creado por {' '} <a>{aPublication.whoPublishedIt}</a>{' '}.
                                            </List.Description>
                                            <List.Description>
                                              {Date(aPublication.date)}
                                            </List.Description>
                                            <Button onClick={()=>this.props.changeStateToComentaryHandler(aPublication.id)}>Ver Comentarios</Button>
                                          </List.Content>
                                        </List.Item>
                                      </Grid.Row>)}
      </List>
    )
  }

}
