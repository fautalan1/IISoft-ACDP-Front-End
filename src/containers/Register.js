import React, { Component } from 'react';
import '../App.css';
import UserService from '../Services/UserService';
import 'react-notifications/lib/notifications.css'
import { Form, Button, Icon } from 'semantic-ui-react';

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
        this.userService.postNewUser(newUser).then(response => 
            {
              console.log(response.data)
            }
          )
            .catch(err => {} )
      }

      handleChange = (ev, input)=>{
        const argsSignup = this.state.argsSignup
        argsSignup[input.name] = input.value
        this.setState({ [input.name]: argsSignup[input.name]})
      }
      /*<Form.Input name="name" onChange={handleChange} fluid icon='user' 
                                iconPosition='left' placeholder='Username' />*/ 
    render() {
        return (
            <div>
                <div style={styles.box} >
                    <Form  onSubmit={this.register}>
                        <Form.Field>
                            <Form.Input name="mail" 
                                        onChange={this.handleChange}
                                        placeholder='Email' 
                                        icon={true?<Icon name="circle outline" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} 
                                        /* icon={!errors.length?null: _find(errors, {path:'email'})?<Icon name="remove circle outline" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />}  */
                                        />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name="name" 
                                        onChange={this.handleChange}
                                        placeholder='Nombre' 
                                        icon={false?<Icon name="circle outline" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} 
                                        /* icon={!errors.length?null: _find(errors, {path:'fullname'})?<Icon name="remove circle outline" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} /> */
                                        />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name="surname" 
                                        onChange={this.handleChange}
                                        placeholder='Apellido' 
                                        icon={false?<Icon name="circle outline" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} 
                                        /* icon={!errors.length?null: _find(errors, {path:'fullname'})?<Icon name="remove circle outline" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} /> */
                                        />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name="userName" 
                                        onChange={this.handleChange}
                                        placeholder='Nombre de Usuario' 
                                        /* icon={!errors.length?null: _find(errors, {path:'username'})?<Icon name="remove circle outline" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />}  */
                                        icon={true?<Icon name="circle outline" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />}
                                        />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name="password" 
                                        onChange={this.handleChange}
                                        type="password" 
                                        placeholder='Password' 
                                        /* icon={!errors.length?null: _find(errors, {path:'password'})?<Icon name="remove circle outline" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} */ 
                                        icon={true?<Icon name="circle outline" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />}
                                        />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name="otherPassword" 
                                        onChange={this.handleChange}
                                        type="password" 
                                        placeholder='Repetir Password' 
                                        /* icon={!errors.length?null: _find(errors, {path:'password'})?<Icon name="remove circle outline" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} */ 
                                        icon={true?<Icon name="circle outline" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />}
                                        />
                        </Form.Field>
                        <Button
                            type='submit'
                            /* disabled={!args.email || !args.username || !args.fullname || !args.password} */
                            primary
                            fluid>
                            Registrarte
                        </Button>
                        {/* "name": "pepita",
                            "userName": "pepita",
                            "password": "password",
                            "mail": "pepita@gmail.com",
                            "birthDate": "3918-07-22T03:00:00Z",
                            "surname": "Swallow" */}
{/*                     {
                        errors.length?<Message negative header="Los siguientes errores:"
                        list={errors.map(error=>`[${error.path}] ${error.message}`)} />:null
                    } */}


                    </Form>

                </div>
            </div>);
    }

}

export default Register