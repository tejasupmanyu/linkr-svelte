import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
export const connection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  dialectOptions: {
    charset: "utf8mb4",
  },
});

export const testConnection = async () => {
  try {
    await connection.authenticate();
    console.log("DB Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();
