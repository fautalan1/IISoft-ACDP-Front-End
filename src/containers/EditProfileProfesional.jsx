import React, { Component } from 'react';
import UserService from '../Services/UserService';
import 'react-notifications/lib/notifications.css'
import { Form, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const styles={
    box:{
            margin          : 'auto',
            marginBottom    : 'center',
            backgroundColor : 'white',
            textAlign       : 'center',
            border          : '1px solid #e6e6e6',
            padding         : '5em', 
            width           : '50%',
        }
}
export default class EditProfileProfesional extends Component {
    
    constructor(){
        super();
        this.userService = new UserService()
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
        console.log(this.userService.GetUserLogged())
        this.userService.setUserPerfil(this.userService.GetUserLogged().userName)
       
       
        const editPerfil ={
           id:          this.userService.GetUserLogged().id,
           userID:      this.userService.GetUserLogged().userID,
           work:        this.state.work,
           git:         this.state.git,
           linkedin:    this.state.linkedin
        }
        this.userService.postProfilePersonal(editPerfil).catch(err => alert(err))
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
                                        icon={this.verifyWork}
                                        />
                        </Form.Field>
                                 
                        <Form.Field>
                            <Form.Input name="git" 
                                        onChange={this.handleChange}
                                        fluid
                                        placeholder='git' 
                                        icon={this.verifyGit}
                                        />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name="linkedin" 
                                        onChange={this.handleChange}
                                        fluid
                                        placeholder='linkedin' 
                                        icon={this.verifyLinkedin}
                                        />
                        </Form.Field>
                
                <Button
                        type='submit'
                        primary
                        fluid
                        disabled={this.state.work === "" ||
                        this.state.git  === "" ||
                        this.state.linkedin    === ""}
                        onClick= {this.save}
                        as={Link} to='/'               name='Home'
                        >
                        Confirmar
                </Button>
                <Button
                        type='submit'
                        primary
                        fluid
                        as={Link} to='/'               name='Home'
                        >
                        Cancelar
                </Button>
               
            </div>
        </div>
        )
      }

}