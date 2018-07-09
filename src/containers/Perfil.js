import React, { Component } from 'react'
import { Label, Segment,Button, Grid, Accordion } from 'semantic-ui-react'
import UserService from '../Services/UserService'
import { Link } from 'react-router-dom'
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
            activeInfoAcademico:false,
            user:"",
            userProfesional:"",
            userAcademico:{ approvedSubjects: []},
            userName:""
        }
        console.log(this.state.user)
    }

    updateUser=(aUser)=>{
        console.log("Entre negro")
        this.userService.getUser(aUser)
        .then(response =>   { 
                            this.profesional(aUser)
                            console.log(aUser)
                            const user = response.data
                            this.setState({
                                user: user,
                                userName:user.userName
                            })

                            })
        .catch(err => { console.log(err) } )
        


        console.log(this.state.user)

    }


    profesional=(aUser)=>{
        this.userService.getUserProfesional(aUser)
        .then(response =>   { 
                            this.academico(aUser)
                            console.log(aUser)
                            const user = response.data
                            this.setState({
                                userProfesional: user,
            
                            })

                            })
        .catch(err => { console.log(err) } )


    }

    academico=(aUser)=>{
        this.userService.getUserAcademicProfileByUserName(aUser).then(response =>   { 
            
            const user = response.data
            this.userService.setApprovedSubjects(user.approvedSubjects)
            console.log(this.userService.getApprovedSubjects())
            this.setState({
                userAcademico: user,
                

            })

            })
        .catch(err => { console.log(err) } )
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
                                    

                                </Accordion.Content>
                        
                                                        {/* Perfil Profesional */}
                                <Accordion.Title active={this.state.activeInfoProfessional} onClick={this.handleInfoProfessional}>
                                    <Label style={styles.tittleProfileStyle} color='black' ribbon>Informacion Profesional</Label>
                                </Accordion.Title>
                                <Accordion.Content active={this.state.activeInfoProfessional}>
                                    <Grid.Row>
                                        <Label style={styles.rowProfileTittleStyle} color='grey'>
                                            Trabajo: 
                                            <Label.Detail >{this.state.userProfesional.work}</Label.Detail> 
                                        </Label>                                 
                                    </Grid.Row><Grid.Row>
                                        <Label style={styles.rowProfileTittleStyle} color='grey'>
                                            Repositorio Git: 
                                            <Label.Detail >{this.state.userProfesional.git}</Label.Detail> 
                                        </Label>                                 
                                    </Grid.Row><Grid.Row>
                                        <Label style={styles.rowProfileTittleStyle} color='grey'>
                                            Perfil LinkedIn: 
                                            <Label.Detail >{this.state.userProfesional.linkedin}</Label.Detail> 
                                        </Label>                                 
                                    </Grid.Row>
                                </Accordion.Content>

                                                            {/* PerfilAcademico */}

                                <Accordion.Title active={this.state.activeInfoAcademico} onClick={this.handleInfoAcedemico}>
                                    <Label style={styles.tittleProfileStyle} color='black' ribbon>Informacion Academica</Label>
                                </Accordion.Title>
                                
                                <Accordion.Content active={this.state.activeInfoAcademico}>
                                    <Grid.Row>
                                        <Label style={styles.rowProfileTittleStyle} color='grey'>
                                            Carrera: 
                                            <Label.Detail >{this.state.userAcademico.career}</Label.Detail>                                             
                                        </Label>                                 
                                    </Grid.Row>
                                    
                                    <Grid.Row>
                                        <Label style={styles.rowProfileTittleStyle} color='grey'>
                                            Materias: {this.state.userAcademico.approvedSubjects.join(", ")}
                                          
                                            {/* <Label.Detail >{this.convertList}</Label.Detail>  */}
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
                            as={Link} to='/editProfilePersonal'               name='editProfilePersonal'
                            >
                            Editar datos Personales
                </Button>
                <Button
                            type='submit'
                            primary
                            fluid
                            as={Link} to='/editProfileProfesional'               name='editProfileProfesional'
                            >
                            Editar datos Profesional
                </Button>
                <Button
                            type='submit'
                            primary
                            fluid
                            as={Link} to='/editProfileAcademico'               name='editProfileAcademico'
                            >
                            Agregar Materia
                </Button>
           
            </div>    
    )
    }
}