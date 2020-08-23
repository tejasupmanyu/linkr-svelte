import { Sequelize } from "sequelize";

export const connection = new Sequelize("linkr", "root", "", {
  host: "localhost",
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
