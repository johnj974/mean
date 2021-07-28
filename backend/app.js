const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mainRoot:ucoEQMvIj4xBaHiG@myfirstcluster.hw4lm.mongodb.net/mean-course?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("connection failure");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join("backend/images")));

app.use("/api/posts", postRoutes);
app.use("./api/user", userRoutes);

module.exports = app;
