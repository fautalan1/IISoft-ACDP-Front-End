import React, { Component } from 'react';
import '../App.css';
import UserService from '../Services/UserService';
import 'react-notifications/lib/notifications.css'
import { Form, Button, Icon } from 'semantic-ui-react';
import { NotificationContainer, NotificationManager } from 'react-notifications'
import {validate} from 'email-validator'

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

class Register extends Component {

    constructor(){
        super();
        this.userService = new UserService()
        this.state = {
            name: "",
            userName: "",
            password: "",
            otherPassword: "",
            mail: "",
            birthDate: "3918-07-22T03:00:00Z",
            surname: "",
            argsSignup: {},
            validMail: true, 
            validUserName: true
        }
    }

    register = () => {

        const newUser = {
            name:       this.state.name,
            userName:   this.state.userName,
            password:   this.state.password,
            mail:       this.state.mail,
            birthDate:  this.state.birthDate,
            surname:    this.state.surname
        }
        
        this.userService.postNewUser(newUser).then(response => {
                this.notificationRegisterSuccess()
            })
            .catch(err => { this.createNotificationErrorRegister() } )
    }

    verifyUserMail = (anUserMail) => {
        if (anUserMail === ""){
            this.setState({ validMail: false })
        } else {
            this.userService.getUserByMail(anUserMail)
                                          .then(response => { 
                                              this.setState({ validMail: true })  
                                              this.createNotificationMail()
                                            })
                                          .catch(err => { 
                                              this.setState({ validMail: false }) 
                                            })
        }
    }                                    

    verifyUserNameIfExist = (anUserName) => {
        if (anUserName === ""){
            this.setState({ validMail: false })
        } else {
            this.userService.getUser(anUserName)
                                          .then(response => { 
                                              this.setState({ validUserName: true })
                                              this.createNotificationUserName() 
                                             })
                                          .catch(err => { 
                                              this.setState({ validUserName: false }) 
                                                  })
        }
    }

    createNotificationUserName = () => {
        NotificationManager.error('The username already exists', 'Alert', 5000, () => {
          alert('callback')
        })
    }

    createNotificationMail = () => {
        NotificationManager.error('The email already exists', 'Alert', 5000, () => {
          alert('callback')
        })
    }

    createNotificationErrorRegister = () => {
        NotificationManager.error('An error has occurred', 'Alert', 5000, () => {
          alert('callback')
        })
    }
    
    notificationRegisterSuccess = () => {
        NotificationManager.success('Successful registration', 'Success')
    }

    verifyIcon = (aBool) => {
        if(aBool) {
            return <Icon name="check circle outline" color="green" size="large" />
        } else {
            return <Icon name="circle outline" color="red" size="large" />
        }
    }

    verifyMail = () => this.verifyIcon(validate(this.state.mail) && !this.state.validMail)

    verifyChange = (value) => this.verifyIcon(value !== "") 

    verifyName = () => this.verifyChange(this.state.name)

    verifySurname = () => this.verifyChange(this.state.surname)

    verifyUserName = () => this.verifyIcon(this.state.userName !== "" && !this.state.validUserName)

    verifyPassword = () => this.verifyChange(this.state.password)

    verifyOtherPassword = () => this.verifyIcon(this.state.otherPassword !== "" && this.state.otherPassword === this.state.password)

    handleChange = (ev, input) => {
        const argsSignup = this.state.argsSignup
        argsSignup[input.name] = input.value
        this.setState({ [input.name]: argsSignup[input.name]})
        if(input.name === "mail"){
            this.verifyUserMail(input.value)
        }
        if(input.name === "userName"){
            this.verifyUserNameIfExist(input.value)
        }
    }

    render() {
        return (
            <div>
                <div style={styles.box} >
                    <Form onSubmit={this.register}>
                        <Form.Field>
                            <Form.Input name="mail" 
                                        onChange={this.handleChange}
                                        fluid
                                        placeholder='Email' 
                                        icon={this.verifyMail} 
                                        />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name="name" 
                                        onChange={this.handleChange}
                                        fluid
                                        placeholder='Nombre' 
                                        icon={this.verifyName} 
                                        />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name="surname" 
                                        onChange={this.handleChange}
                                        fluid
                                        placeholder='Apellido' 
                                        icon={this.verifySurname} 
                                        />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name="userName" 
                                        onChange={this.handleChange}
                                        fluid
                                        placeholder='Nombre de Usuario' 
                                        icon={this.verifyUserName} 
                                        />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name="password" 
                                        onChange={this.handleChange}
                                        type="password" 
                                        fluid
                                        placeholder='Password' 
                                        icon={this.verifyPassword} 
                                        />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name="otherPassword" 
                                        onChange={this.handleChange}
                                        type="password" 
                                        fluid
                                        placeholder='Repetir Password' 
                                        icon={this.verifyOtherPassword} 
                                        />
                        </Form.Field>
                        <Button
                            type='submit'
                            primary
                            fluid
                            disabled={
                                      !validate(this.state.mail)      || 
                                      this.state.name === ""          ||
                                      this.state.surname === ""       ||
                                      this.state.password === ""      ||
                                      this.state.otherPassword === "" ||
                                      this.state.otherPassword !== this.state.password ||
                                      this.state.userName === ""      ||
                                      this.state.validMail            ||
                                      this.state.validUserName
                                     }
                            >
                            Registrarte
                        </Button>
                    </Form>
                    <NotificationContainer/>
                </div>
            </div>);
    }

}

export default Register