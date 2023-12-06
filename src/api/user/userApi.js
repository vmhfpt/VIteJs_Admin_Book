import axiosClient from "../config";
import {withAuth} from "../helper";
export const userApi = {
    authenticate : async (payload) => {
        let url = '/admin/login';
        return await axiosClient.post(url, payload);
    },
    getAll : async() => {
        const headers = withAuth();
        const options = {
            headers: headers
        };
        let url = '/admin/users';
        return await axiosClient.get(url, options);
    },
    create : async(payload) => {
        const headers = withAuth();
        const options = {
            headers: headers
        };
        let url = '/admin/users';
        return await axiosClient.post(url, payload, options);
    },
    findOne : async(id) => {
        const headers = withAuth();
        const options = {
            headers: headers
        };
        let url = '/admin/users/' + id;
        return await axiosClient.get(url, options);
    },
    findByIdAndUpdate : async(id, payload) => {
        const headers = withAuth();
        const options = {
            headers: headers
        };
        let url = '/admin/users/' + id;
        return await axiosClient.put(url,payload, options);
    },
    deleteById : async (id) => {
        const headers = withAuth();
        const options = {
            headers: headers
        };
        let url = '/admin/users/' + id;
        return await axiosClient.delete(url, options);
    }

}