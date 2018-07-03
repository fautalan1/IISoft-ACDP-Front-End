import React, { Component } from 'react'
import { Button, Comment, Form, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ComentariesService from '../Services/ComentariesService';
import UserService from '../Services/UserService';

export default class PublicationComentaries extends Component {

  constructor(props)
  { super(props);
    this.comentariesService = new ComentariesService()
    this.reply=""
    this.state= 
          {
            publicationID : "",
            commentaries: [] ,
          }
  }

  componentDidMount=()=> this.setCommentariesForIDPublication(this.props.idPublication)

  setCommentariesForIDPublication=async(anIdPublication) =>{  
    this.comentariesService.getComentariesOfPublicationId(anIdPublication)
                           .then(response => {
                                                const commentaries = response.data;
                                                this.setState({
                                                  publicationID: anIdPublication, 
                                                  commentaries  });
                                              })
  }

  postCommentary = event => {
    var aReply =  {
                    text            : this.reply,
                    idPublication   : this.state.publicationID,
                    whoPublishedIt  : this.props.anUser,
                    date            :  "3918-07-22T03:00:00Z"
                  }
    
    this.comentariesService.postNewComentary(aReply).then(res =>{this.setState({commentaries: []})})
  }
 
  ///*** METHODOS PROPIOS */
  registryReply=(aReply)=>{
    this.reply = aReply
  }

    //*NO ANDA ESTO VIEJO*//
  shouldComponentUpdate=(nextProps, nextState)=>{
    console.log("debo Actualizar?")
    return (nextProps.idPublication !== this.props.idPublication)|| 
           (nextState.publicationID !== this.state.publicationID)||
           (nextState.commentaries !== this.state.commentaries)
  }   

  componentDidUpdate=(prevProps, prevState)=>{
    //Se Chequea las props nuevas contra las viejas para asegurarse si hay que actualizar
    if (  (prevProps.idPublication !== this.props.idPublication) 
       || (this.state.commentaries.length === 0 )      
    )
    { 
      console.log("Actualizo")
      this.setCommentariesForIDPublication(this.props.idPublication) 
    }
  }
  changePerfil=(userPerfil)=>{
    let servi =new UserService()
    servi.setUserPerfil(userPerfil)
  }



  /* Arma el codigo html con todos los comentarios */
  comentaries=()=>
  {
    
    return (
              <div>
                {this.state.commentaries.map (
                                          aComentaries => <Comment key={aComentaries.id}>
                                                            <Comment.Content>
                                                              <Comment.Author onClick={()=>this.changePerfil(aComentaries.whoPublishedIt)}>
                                                                <Link to={'/perfil'}>{aComentaries.whoPublishedIt}</Link>
                                                                {/* <p className="commentAutor">{aComentaries.whoPublishedIt}  {Date(aComentaries.date)}</p> */}
                                                              </Comment.Author>
                                                              {/* <Comment.Metadata>
                                                                <div className="commentHour">{Date(aComentaries.date)}</div>
                                                              </Comment.Metadata> */}
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
      <Segment inverted color= 'violet' >
        <Comment.Group>
          {this.comentaries()}
          <Form reply inverted>
            <Form.TextArea onInput={(e, { value }) =>this.registryReply(value)}/>
            {/* @todo validacion de contenido del formulario para el boton*/}
           <Button content='Confirm' labelPosition='left' icon='edit' color= 'black' onClick ={ ()=> this.postCommentary() } />
          </Form>
        </Comment.Group>
      </Segment>
      </div>
    )
  }
  


}