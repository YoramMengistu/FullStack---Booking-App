const express = require("express");
const router = express.Router();
const { User } = require("../model/user");
require("dotenv").config();
const Place = require("../model/place");
const jwt = require("jsonwebtoken");

router.get("/profile", async (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      try {
        const { name, email, _id } = await User.findById(userData._id);
        res.json({ name, email, _id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } else {
    res.json(null);
  }
});

module.exports = router;
