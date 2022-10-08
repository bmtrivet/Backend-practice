const express = require("express");
const fs = require("fs");

const app = express();

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

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});

app.listen(3000);
