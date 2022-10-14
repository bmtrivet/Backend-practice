const { Sequelize } = require("sequelize");

module.exports = new Sequelize({
  database: process.env.DB_DATABASE_PROD,
  username: process.env.DB_USER_PROD,
  password: process.env.DB_PASSWORD_PROD,
  host: process.env.DB_HOST_PROD,
  port: process.env.DB_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
