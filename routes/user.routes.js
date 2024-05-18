const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

router.get("/signout", (req, res) => {
  return res.clearCookie("token").json({ message: "Signout successful" });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res
      .status(200)
      .cookie("token", token)
      .json({ message: "Logged in" });
  } catch (error) {
    return res.json({ error: "incorrect Email or Password" });
  }
});

router.post("/singup", async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await User.create({
    userName,
    email,
    password,
  });

  return res.status(201).json({ user: user, message: "User Created" });
});

router.post("/forget", async (req, res) => {
  const { email, password, newpassword } = req.body;
  try {
    const user = await User.generateNewPassword(email, password, newpassword);
    return res.status(200).json({
      message: "Pasword Updated Successfully Use new password to login. ",
      user: user,
    });
  } catch (error) {
    return res.json({ error: "incorrect Email or Password" });
  }
});

module.exports = router;
