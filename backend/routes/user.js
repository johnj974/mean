const express = require("express");
const router = express.Router();

const controllers = require("../controllers/user");

router.post("/signup", controllers.createUser);

router.post("/login", controllers.loginUser);

module.exports = router;
