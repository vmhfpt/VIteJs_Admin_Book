import axiosClient from "./config";
import { router } from "../router";
export async function authenticate(email, password) {
    const loginPayload = {
        email: email,
        password: password
    };

     const response = await axiosClient.post('/admin/login' , loginPayload);
     const token = response.access_token;
     const refreshToken = response.refresh_token;

     return [token, refreshToken];
}

export async function renewToken() {
    
    const refreshToken = JSON.parse(localStorage.getItem("auth")).refresh_token;

    if (!refreshToken){
        alert('You don`t have any token or token is invalid');
        window.location = '/admin/login';
        throw new Error('refresh token does not exist');
        
    }
    const refreshPayload = {
        refresh_token : refreshToken
    };
    const response = await axiosClient.post("/admin/users/get-refresh-token", refreshPayload);
    return [response.access_token, response.refresh_token];
}



export async function getResources() {
    const headers = withAuth();

    const options = {
        headers: headers
    }

    const response = await axiosClient.get("/admin/books", options);
    return response;
}
export async function demoFirst(){
    const headers = withAuth();

    const options = {
        headers: headers
    }

    const response = await axiosClient.get("/admin/users", options);
    return response;
}
export async function demoSecond(){
    const headers = withAuth();

    const options = {
        headers: headers
    }
    const payload = {username : 'ak47016599', email : 'vuminhhungltt904@gmail.com'};
    const response = await axiosClient.post("/admin/users",payload, options);
    return response;
}


export function withAuth(headers) {
    const token = JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).access_token : undefined;

    if (!token) {
        alert('You don`t have any token yet, you have to login to get token');
        window.location = '/admin/login';
        return;
    }

    if (!headers) {
        headers = { };
    }

    headers.Authorization = `Bearer ${token}`

    return headers
}