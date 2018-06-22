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
        console.log("Singleton class created")
    }

    SetUser(aUser) {
        this.userLogged = aUser
    }

    GetUserLogged () {
        return this.userLogged
    }

    getUser= (aName) =>{
        return axios.get('http://localhost:8080/user/' + aName)
    }

    getAllUsers= () =>{
        return axios.get(`http://localhost:8080/users`)
    }
}

export default UserService