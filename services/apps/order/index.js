// externals
import {url_backend} from '../../../lib/axios';
import { errors } from '../../../utils/constant';

/**
 *  @description Order API
 */

export const addOrder = async (listOrder, jwt) => {
    try {
        const {data, status, statusText} = await url_backend.post('/order', listOrder, {headers: {Authorization: jwt, "Content-Type": "application/json"}});
        
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

export const getorderDetails = async() => {
    try {
        const {data, status, statusText} = await url_backend.get('/order', {headers: {"Content-type": "application/json", Authorization: localStorage.getItem('accessToken')}});

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
