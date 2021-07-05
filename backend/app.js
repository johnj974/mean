const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Post = require("./models/post");

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
  post.save();
  res.status(201).json({
    message: "post added successfully",
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((data) => {
    res.status(200).json({
      message: "Posts returned successfully",
      posts: data,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post deleted",
    });
  });
});

module.exports = app;
