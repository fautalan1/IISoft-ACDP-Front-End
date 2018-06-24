import axios from 'axios';
import SessionService from '../Services/SessionService';

let _CategoriesService = null

class CategoriesService {

    constructor () {
        if(!_CategoriesService) {
            this.sessionService = new SessionService()
            _CategoriesService  = this
        }
        else
            return _CategoriesService
    }

    getCategories = () => { return axios.get('http://localhost:8080/categories', this.sessionService.getAuth()) }

}

export default CategoriesService