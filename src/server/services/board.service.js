import { Board } from "../mysql/models";
import BaseService from "./base.service";
import _ from "lodash";

class BoardService extends BaseService {
  constructor() {
    super(Board);
  }

  async getAllBoardsForUser(userId) {
    if (userId) {
      const boards = await this.find({
        where: {
          userId,
        },
        order: [["createdAt", "DESC"]],
      });
      return boards;
    }
    return [];
  }
}

const BoardServiceInstance = new BoardService();
export default BoardServiceInstance;
