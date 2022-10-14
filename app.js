require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./db");
const fileUpload = require("express-fileupload");
const path = require("path");

const models = require("./src/models/models");
const router = require("./src/routes/index");
const errorHandler = require("./src/middleware/ErrorHandlingMiddleware");

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(process.env.PORT || 5000);
  } catch (error) {}
};

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./src", "static")));
app.use(fileUpload({}));
app.use(cors());
app.use("/api", router);

app.use(errorHandler);

start();
