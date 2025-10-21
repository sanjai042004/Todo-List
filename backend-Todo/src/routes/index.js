const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
const todoRoute = require("./todo.route");

router.use("/auth", authRoute);
router.use("/todos", todoRoute);

module.exports = router;
