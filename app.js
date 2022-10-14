const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const news = require("./src/models/newsModel.js");
const Database = require("./src/db/db.js");

const db = Database.Database.getInstance();
db.execute(
  `CREATE TABLE IF NOT EXISTS "news" ("id" SERIAL,"title" VARCHAR(250) NOT NULL,"description" TEXT NOT NULL,PRIMARY KEY ("id"));`
).then((result) => {
  if (result) {
    console.log("Table created");
  }
});

app.use((request, response, next) => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const data = `${hour}:${minutes}:${seconds} ${request.method} ${
    request.url
  } ${request.get("user-agent")}`;
  console.log(data);
  fs.appendFile("server.log", data + "\n", function () {});
  next();
});

app.use(express.json());
app.use(cors());

app.use("/", news.router);

app.listen(process.env.PORT || 5000);
