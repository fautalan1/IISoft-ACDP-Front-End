import axios from 'axios';

let _UserService = null

class UserService {

    constructor () {
        this.anUserPerfil=""
        if(!_UserService) {
            this.userLogged = null
            _UserService = this
        }
        else
            return _UserService
    }

    setUserPerfil(_anUserPerfil){
        this.anUserPerfil= _anUserPerfil
    }

    SetUser(aUser) {
        this.userLogged = aUser
    }

    GetUserLogged () {
        return this.userLogged
    }

    logIn = (username, password) => {
        const aLogin = {
            username,
            password
        }
        return axios.post('http://localhost:8080/api/login', aLogin)

    }

    getUser = (username) => {
        return axios.get('http://localhost:8080/user/' + username)
    }

    getAllUsers = () => {
        return axios.get(`http://localhost:8080/users`)
    }

    postNewUser = (aNewUser) => {
        return axios.post('http://localhost:8080/newUser', aNewUser)
    }

    getUserByMail = (mail) => {
        return axios.get('http://localhost:8080/user/mail/' + mail)
    }

    postProfilePersonal=(profile)=>{
        return axios.post('http://localhost:8080/user',profile)
    }
    

}

export default UserService