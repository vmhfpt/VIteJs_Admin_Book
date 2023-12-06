import { categoryApi } from "../api/category/categoryApi";
class CategoryService {
    async insert(payload){
        return await categoryApi.create(payload);
    }
    async getAll(){
        return await categoryApi.getAll();
    }
    async findOneById(id){
        return await categoryApi.findOne(id);
    }
    async update(id, payload){
        return await categoryApi.findByIdAndUpdate(id, payload);
    }
    async delete(id){
        return await categoryApi.deleteById(id);
    }
}
export default new CategoryService();