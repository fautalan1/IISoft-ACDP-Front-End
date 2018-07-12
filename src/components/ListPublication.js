import React, { Component } from 'react';
import UserService from '../Services/UserService';
import { Link } from 'react-router-dom';
import {Form, Button, Segment, Item, Grid, Label, Message } from 'semantic-ui-react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import SuscribeService from '../Services/SuscribeService';
import PublicationService from '../Services/PublicationService';

const styles= {
                publicationDiv      : {
                                        border          : '1px solid #2d2e2f',
                                        backgroundColor : 'rgb(27, 28, 29)'
                                      },
                publication         : { width           : '57vh',
                                        padding         : '0.5em',
                                        border          : '1px solid #2d2e2f',
                                        backgroundColor : '#2d2e2f'},
                publicationContent  : { width : '50vh' },
                titlePublication    : { width : '62vh' },
                image               : { width :"3vh", 
                                        height:"3vh" },
                autor               : { color : 'white'},
                subscribersButton   : { marginRight:'63px'},
                publication2: {
                  color : 'white'
                }
              }
export default class ListPublication extends Component {

  constructor(props){
    super(props)
    this.suscribeService    = new SuscribeService()
    this.publicationService = new PublicationService()
    this.reply        = ""
    this.titleOfReply = ""
    this.state ={
      category: "",
      publication: []      
    }
  }
  setPublicationByIdCategory=async(anIdCategory)=>{
    this.publicationService.getPublicationsOfCategoryId(anIdCategory)
                           .then(response => {
                                                const publication = response.data;
                                                this.setState({ category:anIdCategory,
                                                                publication  });
                                              })
  }

  componentDidMount=()=> this.setPublicationByIdCategory(this.props.idCategory)

  //Es para saver si hay que actualizar o no, comparo el nuevo state y props contra los viejos, si alguno es distinto debo actualizar
  shouldComponentUpdate=(nextProps, nextState)=>{
    return  (nextProps.idCategory   !== this.props.idCategory)  || 
            (nextState.category     !== this.state.category)    ||
            (nextState.publication  !== this.state.publication)
  }    

  componentDidUpdate=(prevProps, prevState)=>{
    console.log(this.props.idCategory)
    //Se Chequea las props nuevas contra las viejas para asegurarse si hay que actualizar
    if ((prevProps.idCategory         !== this.props.idCategory) ||
        (this.state.publication.length=== 0))
    { 
      console.log("ACTUALIZO!!!")
      this.setPublicationByIdCategory(this.props.idCategory) 
    }
  }
  registryReply=(aReply)=>{
    this.reply = aReply
  }

  registryTitle=(aTitle)=>{
    this.titleOfReply = aTitle
  }

  notificationSuccess = (aPublication) => {
    NotificationManager.success('You have ' + this.suscribeText(aPublication) + 'd correctly', 'Success')
  }

  notificationNotSuccessful = () => {
    NotificationManager.error('An error has occurred', 'Alert', 5000, () => {
      alert('callback')
    })
  }

  postPublication=()=>{
    var aNewPublication = {
                            whoPublishedIt  : this.props.anUser,  
                            text            : this.reply,
                            title           : this.titleOfReply,
                            idCategory      : this.state.category,
                            date            : "3918-07-22T03:00:00Z"
                          }

    this.publicationService.postNewPublication(aNewPublication)
                           .then(res => { this.resetForm()
                                          this.setState({publication: []})})
  }

  suscribe=(aPublication)=>{   
    this.suscribeService.suscribeToPublication(this.props.anUser, aPublication)
                        .then(res =>{
                                      this.notificationSuccess(aPublication)
                                      this.setState({publication: []})
                                    })
                        .catch(err => { this.notificationNotSuccessful()})
  }

  suscribeText=(aPublication)=>{   
    if(aPublication.subscribers.includes(this.props.anUser)){
      return 'Unsubscribe'
    }
    return 'Suscribe'
  }
  changePerfil=(userPerfil)=>{
    let servi =new UserService()
    servi.setUserPerfil(userPerfil)
  }
 
  resetForm = () =>{
    this.reply        = ""
    this.titleOfReply = ""
    document.getElementsByClassName('reply inverted').item(0).reset()
  }

  render(){
    console.log("Hago Render")
    return (
      <Segment style={styles.publicationDiv}>
        <Segment inverted>
            {this.state.publication.map(aPublication =>
                        <Grid.Row key={aPublication.id} > 
                          <Item.Group>
                          <Item style={styles.publication}>
                            <Item.Content>
                              <Item.Header as='a' onClick={()=>this.props.changeStateToComentaryHandler(aPublication.id)}> 
                                <Label ribbon color='blue' style={styles.titlePublication}>{aPublication.title}</Label>
                              </Item.Header>
                              
                              <Item.Meta onClick={() =>this.changePerfil(aPublication.whoPublishedIt)}>
                                <Link to={'/perfil'} style={styles.autor}>
                                  <img  alt       ='Avatar Logo' 
                                        className ="left floated mini ui image" 
                                        src       ='./userLogo.png'
                                        style     ={styles.image}/>
                                  {aPublication.whoPublishedIt}
                                </Link>
                              </Item.Meta>

                              <Item.Description style={styles.publicationContent}>
                                <Message >{aPublication.text}</Message>
                              </Item.Description>

                              <Item.Extra>
                                <Label>
                                  Subscribers: {aPublication.subscribers.join(' , ')}
                                </Label>
                                <Button content       ={this.suscribeText(aPublication)} 
                                        floated       ='right'
                                        labelPosition ='left' 
                                        icon          ='edit' 
                                        color         ='instagram'
                                        onClick       ={ () => this.suscribe(aPublication) } 
                                        size          ='mini'
                                        style         ={styles.subscribersButton}/>
                              </Item.Extra>
                          
                            </Item.Content>
                          </Item>
                        </Item.Group>
                      </Grid.Row>
            )}
          
          <NotificationContainer/>
        </Segment>
        <Form reply inverted>
              <h2 className="" style={styles.publication2}> New Publication </h2>
              <h3 className="" style={styles.publication2}> Title </h3>
              <Form.TextArea onInput={(e, { value }) =>this.registryTitle(value)}/>
              <h3 className="" style={styles.publication2}> Text </h3>
              <Form.TextArea onInput={(e, { value }) =>this.registryReply(value)}/>
              <Button content='Confirm' labelPosition='left' icon='edit' color= 'instagram' onClick ={ ()=> this.postPublication() } />
        </Form>
        
      </Segment>
    )
  }

}
