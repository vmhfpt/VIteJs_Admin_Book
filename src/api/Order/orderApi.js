import axiosClient  from "../config.js";
  const  OrderApi = {
    addOrder : (data) => {
      const url = '/orders';
      return axiosClient.post(url, data);
    },
  
    
 }
 export default OrderApi;