const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
const { Place } = require("./model/place");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const linkRoute = require("./routes/imageUrl");
const bookingRoute = require("./routes/booking");
const cookieParser = require("cookie-parser");

mongoose
  .connect(process.env.MONGO_URL_ATLAS)
  .then(
    () => console.log("Connected to DB"),
    app.listen(
      process.env.PORT_ATLAS,
      console.log("MONGO_PORT_ATLAS:", process.env.PORT_ATLAS)
    )
  )
  .catch((err) => console.log("could not connect to db", err));

app.use(morgan("dev"));
app.use(express.json());

app.use(cookieParser());
app.use(cors());

// ROUTES

app.use("/", authRoute);
app.use("/", userRoute);
app.use("/", linkRoute);

//PLACE
// app.use("/", require("./routes/place"));
app.post("/places", async (req, res) => {
  const token = req.headers.authorization;
  const {
    title,
    address,
    perks,
    description,
    addedPhotos,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) throw err;

      const placeDoc = await Place.create({
        owner: userInfo.id,
        title,
        address,
        perks,
        description,
        addedPhotos,
        extraInfo,
        checkIn,
        photos: addedPhotos,
        checkOut,
        price,
        maxGuests,
      });

      res.json(placeDoc);
    });
  } else {
    res.json(null);
  }
});
app.get("/user-places", (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      const { id } = userInfo;
      res.json(await Place.find({ owner: id }));
    });
  }
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    address,
    perks,
    description,
    addedPhotos,
    extraInfo,
    checkIn,
    checkOut,
    price,
    maxGuests,
  } = req.body;
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      id,
      {
        title,
        address,
        perks,
        description,
        addedPhotos,
        extraInfo,
        checkIn,
        photos: addedPhotos,
        checkOut,
        price,
        maxGuests,
      },
      { new: true }
    );
    if (!updatedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use("/places", async (req, res) => {
  res.json(await Place.find());
});

app.use("/", bookingRoute);
