import { userApi } from "../api/user/userApi";
class UserService {
    async login(payload){
        return await userApi.authenticate(payload);
    }
    async index(){
        return await userApi.getAll();
    }

    async insert(payload){
        return await userApi.create(payload);
    }
    async findOne(id){
        return await userApi.findOne(id);
    }
    async findByIdAndUpdate(id, payload){
        return await userApi.findByIdAndUpdate(id, payload);
    }
    async delete(id){
        return await userApi.deleteById(id);
    }
}
export default new UserService();