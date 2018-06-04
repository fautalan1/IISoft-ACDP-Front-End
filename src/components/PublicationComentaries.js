import React from 'react'
import { Button, Comment, Form, Segment } from 'semantic-ui-react'

const PublicationComentaries = () => (
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
)

export default PublicationComentaries