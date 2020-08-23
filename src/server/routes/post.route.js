import express from "express";
import {
  createPost,
  getLinkPreviewDataForPost,
  deletePost,
} from "../controllers/post.controller";
export const postRouter = express.Router();

postRouter.post("/", createPost);
postRouter.get("/preview/:postId", getLinkPreviewDataForPost);
postRouter.delete("/:postId", deletePost);
