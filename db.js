const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_DATABASE_PROD,
  process.env.DB_USER_PROD,
  process.env.DB_PASSWORD_PROD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT,
    ssl: true,
  }
);
