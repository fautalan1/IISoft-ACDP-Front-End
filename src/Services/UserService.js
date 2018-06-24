import axios from 'axios';

let _UserService = null

class UserService {

    constructor () {
        if(!_UserService) {
            this.userLogged = null
            _UserService = this
        }
        else
            return _UserService
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
}

export default UserService