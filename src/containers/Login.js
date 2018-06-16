import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import App from './App'

const styles = {
    loginStyle: {
        height: '100%',
        width: '500', 
        padding: '8em'
    }
}

export default class Login extends Component {

    render() {
    
        if (this.props.reg) {
          return <App />;
        }
    
        return (
          <div>
            <div className='login-form'>
            {/*
              Heads up! The styles below are necessary for the correct render of this example.
              You can do same with CSS, the main idea is that all the elements up to the `Grid`
              below must have a height of 100%.
            */}
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}</style>
            <Grid textAlign='center' style={styles.loginStyle} verticalAlign='middle' >
              <Grid.Column style={{ maxWidth: 500 }}>
                <Header as='h2' color='teal' textAlign='center'>
                  {/* <Image src="../UNQ Black Logo.png" />  */}
                  Log-in to your account
                </Header>
                <Form size='large'>
                  <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                    />
        
                    <Button color='teal' fluid size='large' onClick={this.props.log}>
                      Login
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  New to us? <a href=''>Sign Up</a>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        </div>
        )
    }
}