// externals
import {url_backend} from '../../../../lib/axios';
import { errors } from '../../../../utils/constant';

/**
 *  @description login API
 */

export const SignInData = async (email, password) => {
    try {
        const {data, status, statusText} = await url_backend.post('/login', {email, password}, {headers: {"Content-Type": "application/json"}});
        
        return {data, status, statusText}
    } catch(error) {
        if(error.response === undefined) {
            return errors.internalServerError
        } else {
            const {status, message} = error.response.data
            if(status && message) return {status: status, statusText: message}
        }
    }
}
