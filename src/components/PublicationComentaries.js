import React, { Component } from 'react'
import { Button, Comment, Form, Segment } from 'semantic-ui-react'
import axios from 'axios';

export default class PublicationComentaries extends Component {

  constructor(props)
  { super(props);
    this.reply=""
    this.state= 
          {
            publicationID : "",
            commentaries: [] ,
            user:""
          }
  }

  componentDidMount=()=>{
    this.setCommentariesForIDPublication(this.props.idPublication)
    this.setUser()
  }
  

  setUser=async()=>{ 
    axios.get(`http://localhost:8080/user`)
    .then(response => {
      const user = response.data;
      this.setState({ user });
    })
  
  }

  setCommentariesForIDPublication=async(anIdPublication) =>{
    /* var commentariesToLoad = ComentariesService.getCommentariesOfPublication(this.state.publicationID)
    this.setState({commentaries:commentariesToLoad}) */
    axios.get('http://localhost:8080/comments/' + anIdPublication)
    .then(response => {
      const commentaries = response.data;
      this.setState({ commentaries });
    })

  }

  //*NO ANDA ESTO VIEJO*//
  // shouldComponentUpdate=(nextProps, nextState)=>{
  //   console.log("Should Update?")
  //   return (nextProps.idPublication !== this.props.idPublication) || (nextState.publicationID !== this.state.publicationID)
  // }   
  
  
  componentDidUpdate=(prevProps, prevState)=>{
    //Se Chequea las props nuevas contra las viejas para asegurarse si hay que actualizar
    if (prevProps.idPublication !== this.props.idPublication)
    { 
      console.log("ACTUALIZO COMENTARIOS!!!")
      this.setCommentariesForIDPublication(this.props.idPublication) 
    }
  }


  ///*** METHODOS PROPIOS */
  registryReply=(aReply)=>{
    this.reply=aReply
  }


  // submitReplyHandler=()=>{ 
  //   var typeDate    = Date.parse("March 21, 2012")
  //   var dateOfReply = Date(typeDate)
  //   var user        = "pepita"
  //   /* var user        = UserService.logUser */
  //   var newReply    = {
  //                       date: dateOfReply,
  //                       idPublication: 1,
  //                       whoPublishedIt: user,
  //                       text: this.reply
  //                     }
  //   ComentariesService.postNewReply(newReply)
                    
  // }


  /* Arma el codigo html con todos los comentarios */
  comentaries=()=>
  {
    
    return (
              <div>
                {this.state.commentaries.map (
                                          aComentaries => <Comment key={aComentaries.id}>
                                                            <Comment.Content>
                                                              <Comment.Author>
                                                                <p className="commentAutor">{aComentaries.whoPublishedIt}</p>
                                                              </Comment.Author>
                                                              <Comment.Metadata>
                                                                <div className="commentHour">{Date(aComentaries.date)}</div>
                                                              </Comment.Metadata>
                                                              <Comment.Text>
                                                                <p className="commentText">{aComentaries.text}</p>
                                                              </Comment.Text>
                                                            </Comment.Content>
                                                          </Comment>)}
                </div>
          )
  }

  render() {

    return (
      <div>
      <Segment inverted>
        <Comment.Group>
          {this.comentaries()}
          <Form reply inverted onSubmit={()=>this.submitReplyHandler()} >
            <Form.TextArea onInput={(e, { value }) =>this.registryReply(value)}/>
            {/* @todo validacion de contenido del formulario para el boton*/}
            <Button content='Responder' labelPosition='left' icon='edit'/>
          </Form>
        </Comment.Group>
      </Segment>
      </div>
    )
  }
  


}