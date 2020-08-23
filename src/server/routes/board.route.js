import express from "express";
import {
  getAllBoardsForUser,
  createBoard,
  deleteBoard,
  updateBoard,
  getBoardDetails,
} from "../controllers/board.controller";
export const boardRouter = express.Router();

boardRouter.get("/", getAllBoardsForUser);
boardRouter.get("/:id", getBoardDetails);

boardRouter.post("/", createBoard);
boardRouter.delete("/:id", deleteBoard);
boardRouter.patch("/:id", updateBoard);
