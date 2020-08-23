import { connection } from "../dbConnection";
import { DataTypes } from "sequelize";
import { Board } from "./board.model";

export const Post = connection.define(
  "Post",
  {
    linkUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(300),
    },
    clickCount: {
      type: DataTypes.INTEGER,
    },
  },
  { charset: "utf8mb4" }
);
Board.hasMany(Post);
Post.belongsTo(Board);
