import React, { Component } from 'react';
import UserService from '../Services/UserService';
import SessionService from '../Services/SessionService';
import 'react-notifications/lib/notifications.css'
import { Form, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const styles={
    box:{
            margin          : 'auto',
            marginBottom    : 'center',
            textAlign       : 'center',
            border          : '1px solid #2d2e2f',
            padding         : '5em', 
            width           : '50%',
            backgroundColor : 'rgb(27, 28, 29)'
        }
}
export default class EditProfileProfesional extends Component {
    
    constructor(){
        super();
        this.userService = new UserService()
        this.sessionService = new SessionService()
        this.state = {
            work:"",
            git:"",
            linkedin:"",
            argsSignup: {},
        }
    }
    

    handleChange = (ev, {name, value}) => {
        const argsSignup = this.state.argsSignup
        argsSignup[name] = value
        this.setState({ [name]: argsSignup[name]})
    }

    save=()=>{
        this.userService.setUserPerfil(this.userService.GetUserLogged().userName)

        const editPerfil ={
           id:          this.userService.GetUserLogged().id,
           userID:      this.userService.GetUserLogged().userID,
           userName:    this.sessionService.getUserNameOfToken(),
           linkedin:    this.state.linkedin,
           git:         this.state.git,
           work:        this.state.work
        }

        console.log(editPerfil)

        this.userService.postProfileWork(editPerfil).catch(err => console.log(err))
    }

    verifyIcon = (aBool) => {
        if(aBool) {
            return <Icon name="check circle outline" color="green" size="large" />
        } else {
            return <Icon name="circle outline" color="red" size="large" />
        }
    }

    verifyChange = (value) => this.verifyIcon(value !== "")

    verifyWork = () => this.verifyChange(this.state.work)

    verifyGit = () => this.verifyChange(this.state.git)
    
    verifyLinkedin=()=> this.verifyChange(this.state.linkedin)


    render(){
        return (
            <div>
                <div style={styles.box}>
                    <Form.Field>
                        <Form.Input name="work" 
                                    onChange={this.handleChange}
                                    fluid
                                    placeholder='work' 
                                    icon={this.verifyWork}/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input name="git" 
                                    onChange={this.handleChange}
                                    fluid
                                    placeholder='git' 
                                    icon={this.verifyGit}/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input name="linkedin" 
                                    onChange={this.handleChange}
                                    fluid
                                    placeholder='linkedin' 
                                    icon={this.verifyLinkedin}/>
                    </Form.Field>
                    <Button.Group attached='bottom'>
                        <Button content='Confirmar'
                                color="instagram"
                                disabled={  this.state.work === "" ||
                                            this.state.git  === "" ||
                                            this.state.linkedin === ""}
                                onClick= {this.save}
                                as={Link} 
                                to='/'
                                name='Home'/>
                        <Button content='Cancelar'
                                color="instagram"
                                as={Link}
                                to='/'
                                name='Home'/>
                    </Button.Group>
                </div>
            </div>
        )
      }

}