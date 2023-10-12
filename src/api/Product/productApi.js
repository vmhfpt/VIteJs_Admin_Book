import axiosClient  from "../config.js";
  const  ProductApi = {
    getListAll : (params) => {
      const url = '/products';
      return axiosClient.get(url, { params: params });
    },
    addProduct : (data) => {
      const url = '/products';
      return axiosClient.post(url, data);
    },
    getById : (id) => {
      const url = '/products/' + `${id}` ;
      return axiosClient.get(url);
    },
    updateById : (data) => {
      const url = '/products/' + data.id;
      return axiosClient.put(url, data);
    },
    deleteById : (id) => {
      const url = '/products/' + id;
      return axiosClient.delete(url);
    },
    getProductByFilter : (params) => {
      const url = '/products/filter';
      return axiosClient.get(url, { params: params });
    },
    getDetail : (id) => {
      const url = '/products/detail/' + id;
      return axiosClient.get(url);
    },
    getProductSuggest : (params) => {
      const url = '/products/product-suggest';
      return axiosClient.get(url, { params: params });
    }
    
 }
 export default ProductApi;