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

  // setPublicationByIdCategory=()=>{
  //     request
  //     .get('http://localhost:8080/publication/' + this.props.idCategory)
  //     .then(res => {
  //       let aPublications = JSON.parse(res.text)
  //       console.log(aPublications)
  //       this.setState({
  //         publication : aPublications
  //       })
  //     })
  //     .catch((err) => {
  //        alert(err)
  //     });

  //   }

    componentDidMount=()=>{
      console.log(this.props)
      request
      .get('http://localhost:8080/publication/' + this.props.idCategory)
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

  /*   shouldComponentUpdate=(nextProps, nextState)=>{
      return nextState !== this.state
    } */

    componentWillReceiveProps=(nextProps)=>{
      console.log("acaProps")
      console.log(nextProps)
      this.setState({category: this.props.idCategory})
       request
      .get('http://localhost:8080/publication/' + this.props.idCategory)
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

    // componentDidUpdate=()=>{
    //   request
    //   .get('http://localhost:8080/publication/' + this.props.idCategory)
    //   .then(res => {
    //     let aPublications = JSON.parse(res.text)
    //     console.log(aPublications)
    //     this.setState({
    //       publication : aPublications
    //     })
    //   })
    //   .catch((err) => {
    //      alert(err)
    //   });
    // }

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
                                                <List.Description>{(x.date)}</List.Description>
                                              </List.Content>
                                            </List.Item>
                                        
                                    )
        }
      </List>
      
    )
  }
  
}

