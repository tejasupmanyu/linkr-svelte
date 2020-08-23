import { connection } from "./dbConnection";
import { User, Board, Post } from "./models";

connection.sync();
