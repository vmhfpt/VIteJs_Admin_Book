import { bookApi } from "../api/book/bookApi"
class BookService {
    async create(payload){
        return await bookApi.create(payload);
    }
    async index(){
        return await bookApi.getAll();
    }
    async findOneById(id){
        return await bookApi.findOne(id);
    }
    async update(id, payload){
        return await bookApi.findByIdAndUpdate(id, payload);
    }
    async delete(id){
        return await bookApi.deleteById(id);
    }
}
export default new BookService();