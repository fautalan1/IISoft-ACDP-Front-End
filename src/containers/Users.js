import React, { Component } from 'react'
import UserService from '../Services/UserService'
import { Link } from 'react-router-dom';

const styles=   {   s1  : { 
                            border          :'1px solid #2d2e2f',
                            backgroundColor :'rgb(27, 28, 29)',
                            marginLeft      :'45px',
                            padding         :'0px',
                            margin          :'22px',
                            align           :'center',
                          },
                    s2  : {
                            color           :'#fff2f2',
                            large           :'5px'
                          },
                    s3  : { color           :'#e6e6e6' },
                }

export default class User extends Component {

    constructor() { 
        super();
        this.state = {
            users: []
        }
    }

    setUsers = async () => { 
      const userService = new UserService()
      
      userService.getAllUsers().then(response => {
          const users = response.data;
          this.setState({ users });
        })
    }

    componentDidMount = () => {
        this.setUsers()
    }
  
    changePerfil=(userPerfil)=>{
      let servi =new UserService()
      servi.setUserPerfil(userPerfil)
    }

    render(){
        return (
          <div className="ui cards">
            {this.state.users.map (anUser =>
                                          <div key={anUser.userName} className="card" style={styles.s1}>
                                            <div className="content">
                                              <img  alt='Avatar Logo' 
                                                    className="right floated mini ui image" 
                                                    src='./userLogo.png'/>
                                              <div  className="header" style={styles.s2}>
                                                <Link style={styles.s2} 
                                                      to={'/perfil'} 
                                                      onClick={()=>this.changePerfil(anUser.userName)}>
                                                  {anUser.userName}
                                                </Link> 
                                              </div>
                                              <div className="meta" style={styles.s3}>
                                                {anUser.surname} {anUser.name}
                                              </div>
                                            </div>
                                          </div>
                                  )
            }
          </div>
        )
      }

}