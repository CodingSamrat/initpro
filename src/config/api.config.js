
import axios from 'axios';



export const BASE_API = NEXT_PUBLIC_API_HOST ? NEXT_PUBLIC_API_HOST + "/api/v1" : "/api/v1"

const ApiManager = axios.create({
    baseURL: BASE_API,
    withCredentials: true,
    credentials: 'include'
});




export default ApiManager