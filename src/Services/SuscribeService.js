import axios from 'axios';
import SessionService from '../Services/SessionService';

let _suscribeService = null

class SuscribeService {

    constructor () {
        if(!_suscribeService) {
            this.sessionService = new SessionService()
            _suscribeService = this
        }
        else
            return _suscribeService
    }
    suscribeToPublication = (anUser, aPublication) => { return axios.put(   'http://localhost:8080//publication/subscriber/' + anUser, 
                                                                            aPublication, 
                                                                            this.sessionService.getAuth())}

}
    
export default SuscribeService