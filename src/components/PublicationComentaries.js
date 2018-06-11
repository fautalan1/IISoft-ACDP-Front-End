import React, { Component } from 'react'
import { Button, Comment, Form, Segment } from 'semantic-ui-react'
import ComentariesService from '../Services/ComentariesService'
import UserService from '../Services/UserService'

export default class PublicationComentaries extends Component {

  constructor(props)
  { super(props);
    this.reply=""
    this.state= 
          {
            publicationID : props.idPublication,
            commentaries: [] 
          }
  }

  componentDidMount=()=>{
    this.setCommentariesForIDPublication()
  }
  
  setCommentariesForIDPublication=async() =>{
    /* var commentariesToLoad = ComentariesService.getCommentariesOfPublication(this.state.publicationID)
    this.setState({commentaries:commentariesToLoad}) */
    try {
      const promise   = await fetch('http://localhost:8080/comments/' + this.state.publicationID)
      const posts     = await promise.json();
      console.log(posts)
      this.setState({
        commentaries : posts
       })
       return null
    }catch(err){
        alert('Hubo Un Error')
        alert(err)
    }
  }

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
  
  registryReply=(aReply)=>{
    this.reply=aReply
  }


  submitReplyHandler=()=>{ 
    var typeDate    = Date.parse("March 21, 2012")
    var dateOfReply = Date(typeDate)
    var user        = "pepita"
    /* var user        = UserService.logUser */
    var newReply    = {
                        date: dateOfReply,
                        idPublication: 1,
                        whoPublishedIt: user,
                        text: this.reply
                      }
    ComentariesService.postNewReply(newReply)
                    
  }

}