import axios from 'axios';
import SessionService from '../Services/SessionService';

let _ComentariesService = null

class ComentariesService {

    constructor () {
        if(!_ComentariesService) {
            this.sessionService = new SessionService()
            _ComentariesService = this
        }
        else
            return _ComentariesService
    }

    getComentariesOfPublicationId = (anIdPublication) => { return axios.get('http://localhost:8080/comments/' 
                                                                            + anIdPublication, 
                                                                            this.sessionService.getAuth())}

    postNewComentary = (aReply) => {return axios.post(  'http://localhost:8080/commentary/', 
                                                        aReply,
                                                        this.sessionService.getAuth() ) }
}
    
export default ComentariesService