import React, { Component } from 'react';
import {List} from 'semantic-ui-react';
import request from 'superagent'



export default class ListPublication extends Component {

  constructor(categoryID){
    super();
    this.state ={
      category: "",
      publication: []
    }
  }


    componentDidMount(){
      request
      .get('http://localhost:8080/publication/' + this.props.onClick.onClick.idCategoria )
      .then(res => {
        let aPublications = JSON.parse(res.text)
        console.log(aPublications)
        this.setState({
          publication : aPublications
        })
      })
      .catch((err) => {
         alert(err)
      });
  
    }


  render() {

    return (
      <List>
        {
          this.state.publication.map(x => 
                                        
                                          <List.Item key={x.id}>
                                              <List.Content>
                                                <List.Header as='a'>{x.title}</List.Header>
                                                <List.Description>
                                                  Creado por {' '} <a>{x.whoPublishedIt}</a>{' '}.
                                                </List.Description>
                                                <List.Description>{Date.parse(x.date).toDateString}</List.Description>
                                              </List.Content>
                                            </List.Item>
                                        
                                    )
        }
      </List>
      
    )
  }
  
}

