import axiosClient  from "../config.js";
  const  OrderDetailApi = {
    addOrderDetail : (data) => {
      const url = '/orderdetails';
      return axiosClient.post(url, data);
    },
    
 }
 export default OrderDetailApi;