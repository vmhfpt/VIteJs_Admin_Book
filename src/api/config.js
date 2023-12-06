import axios from 'axios';
import {renewToken} from './helper';
import { router } from '../router';
var refreshingFunc = undefined;

 function isUnauthorizedError(error) { 
    const {
        response: { status, statusText },
    } = error;
    return status === 401;
 }

 function checkErrorRefreshToken(error) { 
    const {
        response: { status, statusText, data },
    } = error;
    return status === 401 && data.message && data.message == 'refresh_token error';
 }

 

 const axiosClient = axios.create({
     baseURL: 'http://localhost:3000',
     paramsSerializer: (params) => {
         return Object.keys(params)
         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
         .join('&');
   
     },
 });

 axiosClient.interceptors.request.use(async (config) => {
     return config;
 });

 axiosClient.interceptors.response.use((response) => {
     if (response && response.data) {
     return response.data;
     }

     return response;
 },async (error) => {
    const originalConfig = error.config;
    const token = JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).access_token : undefined;
    
    if (!token || !isUnauthorizedError(error)) return Promise.reject(error);
    if(checkErrorRefreshToken(error)) return Promise.reject(error);
   
    
    try {
       
       
        if (refreshingFunc == undefined){
            refreshingFunc = renewToken();
        }
        const [new_access_token, new_refresh_token] = await refreshingFunc;
        
        localStorage.setItem("auth", JSON.stringify({
            ...JSON.parse(localStorage.getItem("auth")),
            access_token : new_access_token,
            refresh_token : new_refresh_token
        }));
        
        originalConfig.headers.Authorization = `Bearer ${new_access_token}`;
        

        try {
            return await axiosClient.request(originalConfig);
        } catch(innerError) {
            if (isUnauthorizedError(innerError)) {
                throw innerError;
            }                  
        }

    } catch (err) {
        localStorage.removeItem("auth");
        localStorage.setItem("url_miss", window.location.pathname);
       alert('your refresh token and access token were expried, you have to login again !!!');
       window.location = '/admin/login';
    } finally {
        refreshingFunc = undefined;
    }

 });
 export default axiosClient;