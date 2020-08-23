import PostService from "../services/post.service";
import BoardService from "../services/board.service";
import _ from "lodash";
import UserService from "../services/user.service";

export async function getBoardsByUsername(req, res) {
  const { username } = req.params;
  const user = await UserService.findUserByUsername(username);
  if (username && user) {
    const boards = await BoardService.getAllBoardsForUser(user.id);
    res.send(boards);
  }
  res.status(400).send();
}

export async function getUserDetails(req, res) {
  const { username } = req.params;
  const user = (await UserService.findUserByUsername(username))[0];
  if (username && !_.isEmpty(user)) {
    const boards = await BoardService.getAllBoardsForUser(user.id);
    const payload = { ...user.dataValues, boards };
    res.send(payload);
  } else {
    res.status(400).send();
  }
}
