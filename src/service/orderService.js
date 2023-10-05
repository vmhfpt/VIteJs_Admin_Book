import OrderApi from "../api/Order/orderApi";
class OrderService {
    
    async create(data){
        return await  OrderApi.addOrder(data);
    }
   
}
export default new OrderService();