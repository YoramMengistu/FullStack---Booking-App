const express = require("express");
const Booking = require("../model/booking");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      {},
      async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      }
    );
  });
}

router.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, price, name, phone } =
    req.body;
  Booking.create({
    place,
    user: userData.id,
    checkIn,
    checkOut,
    numberOfGuests,
    price,
    name,
    phone,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

router.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

module.exports = router;
