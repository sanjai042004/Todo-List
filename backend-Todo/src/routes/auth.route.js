const express = require("express");
const router = express.Router();
const { registerUser, loginUser, googleLogin, refreshToken, logout } = require("../controllers/auth.controller")


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.post("/refresh", refreshToken);
router.post("./logout", logout);

module.exports = router;