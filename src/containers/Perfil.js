import React, { Component } from 'react'
import { Label, Segment,Button, Grid, Accordion } from 'semantic-ui-react'
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
            user:"",
            userName:""
        }
        console.log(this.state.user)
    }

    updateUser=(aUser)=>{
        console.log("Entre negro")
        this.userService.getUser(aUser)
        .then(response =>   { const user = response.data
                            this.setState({
                                user: user,
                                userName:user.userName
                            })

                            })
        .catch(err => { console.log(err) } )
    }

    componentDidMount = () => {
        this.updateUser(this.userService.anUserPerfil)
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
            <div>    
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
                                    </Grid.Row>
                                </Accordion.Content>
                            </Accordion>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Button
                            type='submit'
                            primary
                            fluid
                            as
                            >
                            Editar datos personales
                </Button>
                <Button
                            type='submit'
                            primary
                            fluid
                            >
                            Editar datos laborales
                </Button>
                <Button
                            type='submit'
                            primary
                            fluid
                            >
                            Editar datos academicos
                </Button>
            </div>    
    )
    }
}