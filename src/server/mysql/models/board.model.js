import { connection } from "../dbConnection";
import { DataTypes } from "sequelize";
import { User } from "./user.model";

export const Board = connection.define(
  "Board",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    viewCount: {
      type: DataTypes.INTEGER,
    },
  },
  { charset: "utf8mb4" }
);

User.hasMany(Board);
Board.belongsTo(User);
