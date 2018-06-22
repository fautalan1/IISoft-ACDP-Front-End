import React, { Component } from 'react'
import { Label, Segment, Grid, Accordion } from 'semantic-ui-react'
import UserService from '../Services/UserService'

const styles=   {   rowProfileTittleStyle   : { width       :'50vh',
                                                textAlign   :'left'},
                    tittleProfileStyle      : { width       :'80vh' }
                }

export default class Perfil extends Component {
    
    constructor(props) {
        super(props)    
        this.userService = new UserService()
        this.state = {
            activeInfoAccount: false,
            activeInfoPersonal: false,
            activeInfoProfessional: false,
            user: this.userService.GetUserLogged()
        }
        console.log(this.state.user)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.match.params.userName !== this.props.match.params.userName) {
            this.setUser()
        }
    }

    componentDidMount = () => {
        if (this.props.match.params.userName !== this.state.user.userName )
        {   
            this.userService.getUser(this.props.match.params.userName)
                            .then(response =>   { const user = response.data
                                                this.setState({user: user})
                                                })
                            .catch(err => { this.createNotification() } )
        }       
    }
    
    handleInfoAccount = () => {
        this.setState({activeInfoAccount: !this.state.activeInfoAccount})
      }

    handleInfoPersonal = () => {
        this.setState({activeInfoPersonal: !this.state.activeInfoPersonal})
    }

    handleInfoProfessional = () => {
        this.setState({activeInfoProfessional: !this.state.activeInfoProfessional})
    }

    render() {

        return (
            <Segment basic secondary>
                <Grid centered >
                    <Grid.Row>
                        <Accordion>
                            <Accordion.Title active={this.state.activeInfoAccount} onClick={this.handleInfoAccount}>
                                <Label style={styles.tittleProfileStyle} color='black' ribbon>Informacion De La Cuenta</Label>
                            </Accordion.Title>
                            <Accordion.Content active={this.state.activeInfoAccount}>
                                <Label style={styles.rowProfileTittleStyle} color='grey'>
                                    Nombre de Usuario: 
                                    <Label.Detail >{this.state.user.userName}</Label.Detail> 
                                </Label>
                            </Accordion.Content>
                  
                            <Accordion.Title active={this.state.activeInfoPersonal} onClick={this.handleInfoPersonal}>
                                <Label style={styles.tittleProfileStyle} color='black' ribbon>Informacion Personal</Label>
                            </Accordion.Title>
                            <Accordion.Content active={this.state.activeInfoPersonal}>
                                <Grid.Row>
                                    <Label style={styles.rowProfileTittleStyle} color='grey'>
                                        Nombre: 
                                        <Label.Detail >{this.state.user.name}</Label.Detail> 
                                    </Label>
                                </Grid.Row>
                                <Grid.Row >
                                    <Label style={styles.rowProfileTittleStyle} color='grey'>
                                        Apellido: 
                                        <Label.Detail >{this.state.user.surname}</Label.Detail> 
                                    </Label>
                                </Grid.Row>
                                <Grid.Row >
                                    <Label style={styles.rowProfileTittleStyle} color='grey'>
                                        Edad: 
                                        <Label.Detail >Una Edad</Label.Detail> 
                                    </Label>
                                </Grid.Row>
                                <Grid.Row>
                                    <Label style={styles.rowProfileTittleStyle} color='grey'>
                                        Fecha de Cumpleaños: 
                                        <Label.Detail>{this.state.user.birthDate}</Label.Detail> 
                                    </Label>                                 
                                </Grid.Row>
                            </Accordion.Content>
                      
                            <Accordion.Title active={this.state.activeInfoProfessional} onClick={this.handleInfoProfessional}>
                                <Label style={styles.tittleProfileStyle} color='black' ribbon>Informacion Profesional</Label>
                            </Accordion.Title>
                            <Accordion.Content active={this.state.activeInfoProfessional}>
                                <Grid.Row>
                                    <Label style={styles.rowProfileTittleStyle} color='grey'>
                                        Trabajo: 
                                        <Label.Detail >Un puesto de trabajo</Label.Detail> 
                                    </Label>                                 
                                </Grid.Row><Grid.Row>
                                    <Label style={styles.rowProfileTittleStyle} color='grey'>
                                        Repositorio Git: 
                                        <Label.Detail >Un Repositorio Git</Label.Detail> 
                                    </Label>                                 
                                </Grid.Row><Grid.Row>
                                    <Label style={styles.rowProfileTittleStyle} color='grey'>
                                        Perfil LinkedIn: 
                                        <Label.Detail >Un Perfil LinkedIn</Label.Detail> 
                                    </Label>                                 
                                </Grid.Row><Grid.Row>
                                    <Label style={styles.rowProfileTittleStyle} color='grey'>
                                        Mail: 
                                        <Label.Detail >{this.state.user.mail}</Label.Detail> 
                                    </Label>                                 
                                </Grid.Row>
                            </Accordion.Content>
                        </Accordion>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}