import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import categoriesPublicationsAPI from '../apiCategoriesPublications'


class CategoriesPublicationList extends Component {

  constructor(categoryID){
    super();
    this.state ={
      category: "",
      publication: []
    }
  }

  componentDidMount(){

    this.publication = categoriesPublicationsAPI.get(2)
    this.setState({publication : this.publication})
    /* request
    .get('http://localhost:8080/categories')
    .then(res => {
      
      let categoriesbase = JSON.parse(res.text)
      console.log(categoriesbase)
      this.setState({
        categories : categoriesbase
      })
    })
    .catch((err) => {
       alert(err)
    }); */

  }

  render() {

    return (
      <List>
        {
          this.state.publication.map(x => 
                                          <List.Item>
                                            <List.Content>
                                              <List.Header as='a'>{x.title}</List.Header>
                                              <List.Description>
                                                Creado por {' '} <a>{x.whoPublishedIt}</a>{' '}.
                                              </List.Description>
                                              <List.Description>{x.date}.</List.Description>
                                            </List.Content>
                                          </List.Item>
                                    )
        }
      </List>
      
    )
  }
  
}

export default CategoriesPublicationList