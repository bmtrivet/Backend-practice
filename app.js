const express = require("express");
const fs = require("fs");
const db = require("./src/db/db");
const app = express();
const bodyParser = require("body-parser");

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

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/news", db.getAllNews);
app.get("/news/:id", db.getNewsById);
app.post("/news", db.createNews);

app.listen(process.env.PORT || 5000);
