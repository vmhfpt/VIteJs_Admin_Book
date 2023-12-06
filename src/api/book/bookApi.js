import axiosClient from "../config";
import {withAuth} from "../helper";
export const bookApi = {
    
    getAll : async() => {
        const headers = withAuth();
        const options = {
            headers: headers
        };
        let url = '/admin/books';
        return await axiosClient.get(url, options);
    },
    create : async(payload) => {
        const headers = withAuth();
        const options = {
            headers: { ...headers, 'Content-Type': 'multipart/form-data' }
        };
        let url = '/admin/books';
        return await axiosClient.post(url, payload, options);
    },
    findOne : async(id) => {
        const headers = withAuth();
        const options = {
            headers: headers
        };
        let url = '/admin/books/' + id;
        return await axiosClient.get(url, options);
    },
    findByIdAndUpdate : async(id, payload) => {
        const headers = withAuth();
        const options = {
            headers: { ...headers, 'Content-Type': 'multipart/form-data' }
        };
        let url = '/admin/books/' + id;
        return await axiosClient.put(url,payload, options);
    },
    deleteById : async (id) => {
        const headers = withAuth();
        const options = {
            headers: headers
        };
        let url = '/admin/books/' + id;
        return await axiosClient.delete(url, options);
    }

}