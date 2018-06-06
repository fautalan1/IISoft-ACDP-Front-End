import React, { Component } from 'react';
import {List} from 'semantic-ui-react';




export default class ListPublication extends Component {

  constructor(categoryID){
    super();
    this.state ={
      category: "",
      publication: []
    }
  }


   setPublicationByIdCategory=async ()=>{
    try{
      const promise = await fetch('http://localhost:8080/publication/' + this.props.idCategory)
      const posts= await promise.json();
      console.log(posts)
       this.setState({
        publication : posts
       })
       return null
     }catch(err){
       alert(err)
    }

  }

    componentDidMount=()=>{
      this.setPublicationByIdCategory()
    }

  /*   shouldComponentUpdate=(nextProps, nextState)=>{
      return nextState !== this.state
    } */

    componentWillReceiveProps=(nextProps)=>{
      console.log("acaProps")
      console.log(nextProps)
      this.setPublicationByIdCategory()
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

