const express = require("express");
const bodyParser = require("body-parser");
const app = express();
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

const Post = require("./models/post");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  res.status(201).json({
    message: "post added successfully",
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    { id: "a1234", title: "first post", content: "first post content" },
    { id: "b1234", title: "second post", content: "second post content" },
    { id: "c1234", title: "third post", content: "third post content" },
  ];
  res.status(200).json({
    message: "Posts returned successfully",
    posts: posts,
  });
});

module.exports = app;

// ucoEQMvIj4xBaHiG
