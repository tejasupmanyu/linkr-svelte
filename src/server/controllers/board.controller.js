import BoardService from "../services/board.service";
import PostService from "../services/post.service";

import _ from "lodash";

export async function getAllBoardsForUser(req, res) {
  const userId = _.get(req, "session.passport.user.id", {});
  const allBoards = await BoardService.getAllBoardsForUser(userId);
  res.send(allBoards);
}

export async function createBoard(req, res) {
  const userId = _.get(req, "session.passport.user.id", {});
  const createdBoard = await BoardService.create({
    ...req.body,
    UserId: userId,
  });
  res.status(201).send(createdBoard);
}

export async function deleteBoard(req, res) {
  const { isAllowed, boardId } = await isAllowedUpdateAccessToBoard(req);
  if (isAllowed) {
    await BoardService.deleteOneById(boardId);
    res.send(board);
  } else {
    res.status(400).send();
  }
}

export async function updateBoard(req, res) {
  const { isAllowed, boardId } = await isAllowedUpdateAccessToBoard(req);
  if (isAllowed) {
    const updatedBoard = await BoardService.updateOneById(boardId, req.body);
    res.send(updatedBoard);
  } else {
    res.status(400).send();
  }
}

export async function getBoardDetails(req, res) {
  const boardId = req.params.id;
  const boardDetails = await BoardService.findOneById(boardId);
  if (boardId) {
    const allPosts = await PostService.getAllPostsInBoard(boardId);
    const payload = {
      ...boardDetails.dataValues,
      posts: allPosts,
      totalPostCount: allPosts.length,
    };
    res.send(payload);
  }
  res.status(400).send();
}

async function isAllowedUpdateAccessToBoard(req) {
  const userId = _.get(req, "session.passport.user.id", {});
  const boardId = _.get(req, "params.id", "");
  const board = await BoardService.findOneById(boardId);
  const isAllowed = userId && boardId && board.UserId === parseInt(userId);
  return { userId, boardId, board, isAllowed };
}
