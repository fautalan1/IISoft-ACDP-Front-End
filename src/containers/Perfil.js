import React, { Component } from 'react'
import { Label, Segment,Button, Grid, Accordion } from 'semantic-ui-react'
import UserService from '../Services/UserService'
import { Link } from 'react-router-dom'
import SessionService from '../Services/SessionService';

const styles=   {   rowProfileTittleStyle   : { width           :'50vh',
                                                textAlign       :'left'},
                    tittleProfileStyle      : { width           :'80vh'},
                    div                     : { align           :'center'},
                    segmentProfile          : { backgroundColor :'transparent'},
                    editButton              : { width           :'25%',
                                                align           :'center',}
                }

export default class Perfil extends Component {
    
    constructor(props) {
        super(props)    
        this.userService = new UserService()
        this.sessionService = new SessionService()
        this.state = {
            activeInfoAccount: true,
            activeInfoPersonal: true,
            activeInfoProfessional: true,
            activeInfoAcademico:true,
            user:"",
            userAcademico:{ approvedSubjects: []},
            userName:"",
            showButtons: true
        }
        console.log(this.state.user)
    }

    updateUser=(aUser)=>{
        console.log("Entre negro")
        this.userService.getUser(aUser)
        .then(response =>   { 
                            
                            console.log(aUser)
                            const user = response.data
                            this.userService.SetUser(user)
                            this.setState({
                                user: user,
                                userName:user.userName,
                                userAcademico: user
                            })
                            this.canEdit()
                            console.log(this.state.user)
                            })
        .catch(err => { console.log(err) } )
        


        console.log(this.state.user)

    }


    // profesional=(aUser)=>{
    //     this.userService.getUserProfesional(aUser)
    //     .then(response =>   { 
    //                         this.academico(aUser)
    //                         console.log(aUser)
    //                         const user = response.data
    //                         this.userService.setWork(user)
    //                         this.setState({
    //                             userProfesional: user,
    //                         })
    //                         })
    //     .catch(err => { console.log(err) } )
    // }

    // academico=(aUser)=>{
    //     this.userService.getUserAcademicProfileByUserName(aUser).then(response =>   { 
            
    //         const user = response.data
    //         this.userService.setApprovedSubjects(user.approvedSubjects)
    //         this.userService.setAcademico(user)
    //         console.log(this.userService.getApprovedSubjects())
    //         this.setState({
    //             userAcademico: user,
                

    //         })

    //         })
    //     .catch(err => { console.log(err) } )
    // }

    canEdit=()=>{
        const aBool = this.state.userName === this.sessionService.getUserNameOfToken()
        this.setState({
            showButtons: aBool
        })
    }


    componentDidMount = () => {
        console.log("ok")
        this.updateUser(this.userService.anUserPerfil)
        console.log(this.state.user)
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
    handleInfoAcedemico =()=>{
        this.setState({activeInfoAcademico: !this.state.activeInfoAcademico})
    }

    render() {

        return (
                <div>    
                    <Segment basic secondary style={styles.segmentProfile}>
                        <Grid centered>
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
                        
                                                            {/* Perfil Personal */}
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
                                        <Button circular
                                                color   ='instagram'
                                                content ='Editar datos Personales'
                                                as      ={Link} 
                                                to      ='/editProfilePersonal'
                                                name    ='editProfilePersonal'
                                                disabled={!this.state.showButtons}
                                                style   ={styles.editButton}/>
                                    </Accordion.Content>
                                    
                            
                                                            {/* Perfil Profesional */}
                                    <Accordion.Title active={this.state.activeInfoProfessional} onClick={this.handleInfoProfessional}>
                                        <Label style={styles.tittleProfileStyle} color='black' ribbon>Informacion Profesional</Label>
                                    </Accordion.Title>
                                    <Accordion.Content active={this.state.activeInfoProfessional}>
                                        <Grid.Row>
                                            <Label style={styles.rowProfileTittleStyle} color='grey'>
                                                Trabajo: 
                                                <Label.Detail >{this.state.user.work}</Label.Detail> 
                                            </Label>                                 
                                        </Grid.Row><Grid.Row>
                                            <Label style={styles.rowProfileTittleStyle} color='grey'>
                                                Repositorio Git: 
                                                <Label.Detail >{this.state.user.git}</Label.Detail> 
                                            </Label>                                 
                                        </Grid.Row><Grid.Row>
                                            <Label style={styles.rowProfileTittleStyle} color='grey'>
                                                Perfil LinkedIn: 
                                                <Label.Detail >{this.state.user.linkedin}</Label.Detail> 
                                            </Label>                                 
                                        </Grid.Row>
                                        <Button circular
                                                color   ='instagram'
                                                content ='Editar datos Profesional'
                                                as      ={Link} 
                                                to      ='/editProfileProfesional'
                                                name    ='editProfileProfesional'
                                                disabled={!this.state.showButtons}
                                                style   ={styles.editButton}/>
                                    </Accordion.Content>

                                                                {/* PerfilAcademico */}
                                    <Accordion.Title active={this.state.activeInfoAcademico} onClick={this.handleInfoAcedemico}>
                                        <Label style={styles.tittleProfileStyle} color='black' ribbon>Informacion Academica</Label>
                                    </Accordion.Title>
                                    <Accordion.Content active={this.state.activeInfoAcademico}>
                                        <Grid.Row>
                                            <Label style={styles.rowProfileTittleStyle} color='grey'>
                                                Carrera: 
                                                <Label.Detail >{this.state.user.career}</Label.Detail>                                             
                                            </Label>                                 
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Label style={styles.rowProfileTittleStyle} color='grey'>
                                                Materias: {this.state.userAcademico.approvedSubjects.join(', ')}
                                            </Label>                                 
                                        </Grid.Row> 
                                        <Button circular
                                                color   ='instagram'
                                                content ='Agregar Materia'
                                                as      ={Link}
                                                to      ='/editProfileAcademico'
                                                name    ='editProfileAcademico'
                                                disabled={!this.state.showButtons}
                                                style   ={styles.editButton}/>
                                                
                                    </Accordion.Content>
                                </Accordion>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </div>    
            )
    }
}