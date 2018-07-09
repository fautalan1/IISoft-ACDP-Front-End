import axios from 'axios';
import SessionService from '../Services/SessionService';
let _UserService = null

class UserService {

    constructor () {
        this.anUserPerfil=""
        this.approvedSubjects=""
        this.sessionService = new SessionService()
        if(!_UserService) {
            this.userLogged = null
            _UserService = this
        }
        else
            return _UserService
    }
    getApprovedSubjects(){
       return this.approvedSubjects
    }

    setApprovedSubjects(someApprovedSubjects){
        this.approvedSubjects = someApprovedSubjects
    }
    isPerfilUser(){
       return this.anUserPerfil === this.GetUserLogged().userName
    }

    setUserPerfil(_anUserPerfil){
        this.anUserPerfil= _anUserPerfil
    }

    SetUser(aUser) {
        this.userLogged = aUser
    }

    GetUserLogged(){
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
        return axios.post('http://localhost:8080/user',profile, this.sessionService.getAuth())
    }

    getUserProfesional=(aUsername)=>{
        return axios.get('http://localhost:8080/userWorkProfile/' + aUsername)        
    }
    getUserAcademicProfileByUserName=(aUsername)=>{
        return axios.get('http://localhost:8080/userAcademicProfile/' + aUsername)   
    }

    

}

export default UserService