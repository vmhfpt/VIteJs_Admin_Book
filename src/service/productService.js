import ProductApi from "../api/Product/productApi.js"
class ProductService {
    async index(value){
        return await ProductApi.getListAll(value);
    }
    async create(data){
        return await ProductApi.addProduct(data);
    }
    async findOne(id){
        return await ProductApi.getById(id);
    }
    async update(data){
        return await ProductApi.updateById(data);
    }
    async delete(id){
        return await ProductApi.deleteById(id);
    }
    async getByFilter(data){
        return await ProductApi.getProductByFilter(data);
    }
    async getDetailProduct(id){
        return await ProductApi.getDetail(id);
    }
    async getProductSuggest(param){
        return await ProductApi.getProductSuggest(param);
    }
}
export default new ProductService();