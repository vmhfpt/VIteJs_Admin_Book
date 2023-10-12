import axiosClient  from "../config.js";
  const  CommentApi = {
    addComment : (data) => {
      const url = '/comments';
      return axiosClient.post(url, data);
    },
    getByProductId : (data) => {
        const url = '/comments/product';
        return axiosClient.get(url, { params: data });
    }
 }
 export default CommentApi;