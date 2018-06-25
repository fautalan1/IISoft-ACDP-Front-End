import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Form, Button, Segment, Item, Grid } from 'semantic-ui-react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import SuscribeService from '../Services/SuscribeService';
import PublicationService from '../Services/PublicationService';
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
                           .then(res => { this.setState({publication: []})})
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
 
  render(){
    console.log("Hago Render")
    return (
      <Segment inverted  color='violet'  >
        <Segment inverted  color='violet'  >
            {this.state.publication.map(aPublication =>
                        <Grid.Row key={aPublication.id} > 
                          <Item.Group>
                          <Item>
                            {/* {<Item.Image size='tiny' src='../image/icono.png' />} */}
                      
                            <Item.Content>
                            
                              <Item.Header as='a' onClick={()=>this.props.changeStateToComentaryHandler(aPublication.id)}> 
                                <p className="" >{aPublication.title}</p>
                              </Item.Header>
                              <Item.Meta>
                                <Link to={'/user/' + aPublication.whoPublishedIt}>{aPublication.whoPublishedIt}</Link>
                              </Item.Meta>
                              <Item.Description>
                                <p className="">{aPublication.text } </p>
                              </Item.Description>

                              <Item.Extra>
                                <div className="">{Date(aPublication.date)}</div>
                              </Item.Extra>
                                Subscribers: [{aPublication.subscribers.join(' , ')}], Cant: {aPublication.cantSubscribers}
                              <Item.Extra>                                
                                <Button content={this.suscribeText(aPublication)} labelPosition='left' icon='edit' 
                                color= 'blue' onClick ={ () => this.suscribe(aPublication) } />
                              </Item.Extra>
                          
                            </Item.Content>
                          </Item>
                        </Item.Group>
                      </Grid.Row>
            )}
          
          <NotificationContainer/>
        </Segment>
        <Form reply inverted>
              <h2 className=""> New Publication </h2>
              <h3 className=""> Title </h3>
              <Form.TextArea onInput={(e, { value }) =>this.registryTitle(value)}/>
              <h3 className=""> Text </h3>
              <Form.TextArea onInput={(e, { value }) =>this.registryReply(value)}/>
              <Button content='Confirm' labelPosition='left' icon='edit' color= 'black' onClick ={ ()=> this.postPublication() } />
        </Form>
        
      </Segment>
    )
  }

}
