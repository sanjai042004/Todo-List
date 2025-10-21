const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");
const {
  createTokens,
  attachTokens,
  clearCookies,
  publicUser,
} = require("../utils/auth");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const JWT_SECRET = process.env.JWT_SECRET;

//Register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email & password required" });

    if (password.length < 8)
      return res
        .status(400)
        .json({ success: false, message: "Password must be 8+ chars" });

    const lowerEmail = email.toLowerCase();
    if (await User.findOne({ email: lowerEmail }))
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });

    const user = await User.create({
      name: name || lowerEmail.split("@"[0]),
      email: lowerEmail,
      password,
      authProvider: "local",
    });

    const tokens = createTokens(user);
    user.refreshTokens.push(tokens.refreshToken);
    await user.save();

    attachTokens(res, tokens);
    res.status(201).json({ success: true, user: publicUser(user) });
  } catch (error) {
    console.log("Regiter error: ", error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//login user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user || !(await user.comparePassword(password)))
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credinals" });

    const tokens = createTokens(user);
    user.refreshTokens.push(tokens.refreshToken);
    await user.save();

    attachTokens(res, tokens);
    res.status(201).json({ success: true, user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: "server Error" });
  }
};

//google login

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        authProvider: "google",
        profileImage: "",
      });
    }

    const tokens = createTokens(user);

    user.refreshTokens.push(tokens.refreshToken);
    await user.save();

    attachTokens(res, tokens);
    res.json({ success: true, user: publicUser(user) });
  } catch (error) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "no Refresh Token" });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.refreshTokens.includes(token))
      return res
        .status(403)
        .json({ success: false, message: "Invalid refresh token" });

    const newTokens = createTokens(user);
    user.refreshTokens = user.refreshTokens
      .filter((t) => t !== token)
      .concat(newTokens.refreshToken);
    await user.save();

    attachTokens(res, newTokens);
    res.json({ success: true, user: publicUser(user) });
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired refresh token" });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
        await user.save();
      }
    }
  } finally {
    clearCookies(res);
    res.json({ success: true, message: "Logged out" });
  }
};


module.exports ={
    registerUser,
    loginUser,
    googleLogin,
    refreshToken,
    logout
}