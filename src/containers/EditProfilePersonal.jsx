import React, { Component } from 'react';
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
export default class EditProfilePersonal extends Component {
    
    constructor(){
        super();
        this.userService = new UserService()
        this.state = {
            name: "",
            birthDate: "",
            surname: "",
            argsSignup: {},
        }
    }
    

    handleChange = (ev, {name, value}) => {
        const argsSignup = this.state.argsSignup
        argsSignup[name] = value
        this.setState({ [name]: argsSignup[name]})
    }


    whitespace= (ev, {name, value})=>{
        if(value !== "") {
            return <Icon name="check circle outline" color="green" size="large" />
        } else {
            return <Icon name="circle outline" color="red" size="large" />
        }
    }
    verifyConfirm=()=>{
        return(
        this.state.name === "" ||
        this.state.birthDate  === "" ||
        this.state.surname    === "" )
    }

    save=()=>{
        const editPerfil ={
           userName:  this.userService.GetUserLogged().userName,
           name: this.state.name,
           surname: this.state.surname,
           mail: this.userService.GetUserLogged().mail,
           birthDate: this.state.birthDate, 

        }
        
        this.userService.postProfilePersonal(editPerfil).catch(err => alert(err))
    }


    render(){
        return (
            <div>
            <div style={styles.box}>
           
                        <Form.Field>
                            <Form.Input name="name" 
                                        onChange={this.handleChange}
                                        fluid
                                        placeholder='name' 
                                        icon={this.whitespace}
                                        />
                        </Form.Field>
                                 
                        <Form.Field>
                            <Form.Input name="surname" 
                                        onChange={this.handleChange}
                                        fluid
                                        placeholder='surname' 
                                        icon={this.whitespace}
                                        />
                        </Form.Field>
                                 
                        <Form.Field>
                            <Form.Input name="birthName" 
                                        onChange={this.handleChange}
                                        fluid
                                        placeholder='birthName' 
                                        icon={this.whitespace}
                                        />
                        </Form.Field>
                
                <Button
                        type='submit'
                        primary
                        fluid
                        disabled={this.verifyConfirm}
                        onClick= {this.save}
                        >
                        Confirmar
                </Button>
                <Button
                        type='submit'
                        primary
                        fluid
                        >
                        Cancelar
                </Button>
               
            </div>
        </div>
        )
          
      }

}