import { connection } from "../dbConnection";
import { DataTypes } from "sequelize";

export const User = connection.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  displayName: {
    type: DataTypes.STRING,
  },
  profileImageUrl: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});
