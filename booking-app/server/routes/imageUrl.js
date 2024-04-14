const express = require("express");
const router = express.Router();
const imageDownloader = require("image-downloader");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post("/upload-by-link", upload.single("link"), async (req, res) => {
  const { link } = req.body;
  const newName = "/photo" + Date.now() + ".jpg";
  try {
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (err) {
    res.status(500).json({ err: "Failed to Download" });
  }
});

router.use("/upload", express.static(__dirname + "/uploads"));

module.exports = router;
