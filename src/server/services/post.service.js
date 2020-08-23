import _ from "lodash";
import { Post } from "../mysql/models";
import BaseService from "./base.service";

class PostService extends BaseService {
  constructor() {
    super(Post);
  }

  async getAllPostsInBoard(boardId) {
    if (boardId) {
      const posts = await this.find({
        where: {
          BoardId: boardId,
        },
        order: [["createdAt", "DESC"]],
      });
      return posts;
    }
    return [];
  }
}

const PostServiceeInstance = new PostService();
export default PostServiceeInstance;
