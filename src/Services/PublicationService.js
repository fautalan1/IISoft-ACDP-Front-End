import axios from 'axios';
import SessionService from '../Services/SessionService';

let _publicationService = null

class PublicationService {

    constructor () {
        if(!_publicationService) {
            this.sessionService = new SessionService()
            _publicationService = this
        }
        else
            return _publicationService
    }

    getPublicationsOfCategoryId = (anIdCategory) => {return axios.get(  'http://localhost:8080/publication/' 
                                                                        + anIdCategory, 
                                                                        this.sessionService.getAuth())}
    
    postNewPublication = (aNewPublication) => { return axios.post(  'http://localhost:8080/publication/',
                                                                    aNewPublication, 
                                                                    this.sessionService.getAuth())}

}
    
export default PublicationService