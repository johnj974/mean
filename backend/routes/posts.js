const express = require("express");

const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const controllers = require("../controllers/posts");
const multer = require("../middleware/multer");

router.post("", checkAuth, multer, controllers.createPost);

router.get("", controllers.retrievePosts);

router.get("/:id", controllers.retrievePost);

router.delete("/:id", checkAuth, controllers.deletePost);

router.put("/:id", checkAuth, multer, controllers.updatePost);

module.exports = router;
