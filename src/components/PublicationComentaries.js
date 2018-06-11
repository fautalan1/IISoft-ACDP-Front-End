import React, { Component } from 'react'
import { Button, Comment, Form, Segment } from 'semantic-ui-react'
import ComentariesService from '../Services/ComentariesService'

export default class PublicationComentaries extends Component {

  constructor(props)
  { super(props);
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
                                                              <Comment.Actions>
                                                                <Comment.Action>
                                                                  <p className="commentReply">Reply</p>
                                                                </Comment.Action>
                                                              </Comment.Actions>
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
        <Form reply inverted>
          <Form.TextArea />
          <Button content='Add Comment' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    </Segment>
    </div>
  )
}

/*TODO: Es una base, no tiene funcionalidad ni nada.*/
/* const PublicationComentariesConst = () => (
  <Segment inverted>
  <Comment.Group>
    <Comment>
      <Comment.Avatar as='a' src='/assets/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Comment.Author><p className="commentAutor">Joe Henderson</p></Comment.Author>
        <Comment.Metadata>
          <div className="commentHour">1 day ago</div>
        </Comment.Metadata>
        <Comment.Text>
        <p className="commentText">
            The hours, minutes and seconds stand as visible reminders that your effort put them all
            there.
          </p>
          <p className="commentText">
            Preserve until your next run, when the watch lets you see how Impermanent your efforts
            are.
          </p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action><p className="commentReply">Reply</p></Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar as='a' src='/assets/images/avatar/small/christian.jpg' />
      <Comment.Content>
        <Comment.Author>Christian Rocha</Comment.Author>
        <Comment.Metadata>
          <div>2 days ago</div>
        </Comment.Metadata>
        <Comment.Text>I re-tweeted this.</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply inverted>
      <Form.TextArea />
      <Button content='Add Comment' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
  </Segment>
) */

}