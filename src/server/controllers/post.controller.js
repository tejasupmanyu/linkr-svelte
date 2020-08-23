import _ from "lodash";
import linkPreviewGenerator from "link-preview-generator";
import PostService from "../services/post.service";
import BoardService from "../services/board.service";

export async function createPost(req, res) {
  const { isAllowed } = await isAllowedAccessToPost(req);
  const { boardId, ...rest } = req.body;
  if (isAllowed) {
    const createdPost = await PostService.create({
      ...rest,
      BoardId: boardId,
    });
    res.status(201).send(createdPost);
  } else {
    res.status(400).send();
  }
}

export async function deletePost(req, res) {
  const { isAllowed, boardId } = await isAllowedAccessToPost(req);
  const { postId } = req.params;
  const post = await PostService.findOneById(postId);
  if (isAllowed && post && post.BoardId === boardId) {
    await PostService.deleteOneById(postId);
    res.send();
  } else {
    res.status(400).send();
  }
}

async function isAllowedAccessToPost(req) {
  const userId = _.get(req, "session.passport.user.id", {});
  const boardId = _.get(req, "body.boardId", "");
  const board = await BoardService.findOneById(boardId);
  const isAllowed =
    userId && boardId && board && board.UserId === parseInt(userId);
  return { userId, boardId, board, isAllowed };
}

export async function getLinkPreviewDataForPost(req, res) {
  const { postId } = req.params;
  const post = await PostService.findOneById(postId);
  if (post) {
    try {
      const previewData = await linkPreviewGenerator(post.linkUrl);
      res.send(previewData);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
}
