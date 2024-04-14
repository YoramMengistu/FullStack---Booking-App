const express = require("express");
const { register, login } = require("../controllers/auth");
const { User } = require("../model/user");
const router = express.Router();

require("dotenv").config();

router.post("/register", register);
router.post("/login", login);

router.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});


module.exports = router;
