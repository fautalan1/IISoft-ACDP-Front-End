import React, { Component } from 'react'
import { Button, Comment, Form, Segment } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class PublicationComentaries extends Component {

  constructor(props)
  { super(props);
    this.reply=""
    this.state= 
          {
            publicationID : "",
            commentaries: [] ,
            user:"",
          }
  }

  componentDidMount=()=>{
    this.setCommentariesForIDPublication(this.props.idPublication)
  }

  getAuth = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const auth = 'Bearer-' + token.access_token
    const header = { headers: {"Authorization" : auth} }
    return header
  }

  setCommentariesForIDPublication=async(anIdPublication) =>{
    /* var commentariesToLoad = ComentariesService.getCommentariesOfPublication(this.state.publicationID)
    this.setState({commentaries:commentariesToLoad}) */
    axios.get('http://localhost:8080/comments/' + anIdPublication, this.getAuth())
    .then(response => {
      const commentaries = response.data;
      this.setState({
        publicationID: anIdPublication, 
        commentaries  });
    })

  }

  postCommentary = event => {
    console.log("Entre como loco");
    axios.post('http://localhost:8080/commentary/',  
    {
        text            : this.reply,
        idPublication   : this.state.publicationID,
        whoPublishedIt  : this.props.anUser,
        date            :  "3918-07-22T03:00:00Z"

    }, this.getAuth() )
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({commentaries: []})
      })
  }
 
  ///*** METHODOS PROPIOS */
  registryReply=(aReply)=>{
    this.reply = aReply
  }

    //*NO ANDA ESTO VIEJO*//
  shouldComponentUpdate=(nextProps, nextState)=>{
    console.log("Should Update?")
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
      console.log("ACTUALIZO COMENTARIOS!!!")
      this.setCommentariesForIDPublication(this.props.idPublication) 
    } else {}
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
                                                                <Link to={'/user/' + aComentaries.whoPublishedIt}>{aComentaries.whoPublishedIt}</Link>
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