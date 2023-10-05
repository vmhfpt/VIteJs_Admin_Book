import CommentApi from "../api/Comment/commentApi";
class CommentService {
    async create(data){
        return await  CommentApi.addComment(data);
    }
    async getByProduct(data){
        return await CommentApi.getByProductId(data);
    }
}
export default new CommentService();