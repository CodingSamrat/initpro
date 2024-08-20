
import { API_HOST } from '@/root.config';
import axios from 'axios';



export const BASE_API = API_HOST ? API_HOST + "/api/v1" : "/api/v1"

const ApiManager = axios.create({
    baseURL: BASE_API,
    withCredentials: true,
    credentials: 'include'
});




export default ApiManager