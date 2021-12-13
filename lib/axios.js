import axios from 'axios';
import {baseApigeeUrl} from '../utils/constant';

export const url_backend = axios.create({
    baseURL: baseApigeeUrl
})