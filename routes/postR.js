const express = require("express");
const fs = require("fs");
const multer = require("multer");
const Blog = require("../models/blog");

const router = express.Router();

//storage
router.use(express.static("public"));
// to upload a file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uplode = multer({ storage: storage });

router.post("/instaPost", uplode.single("image"), async (req, res) => {
  try {
    await Blog.create({
      author: req.body.author,
      location: req.body.location,
      description: req.body.description,
      image: {
        data: fs.readFileSync("public/image/" + req.file.filename),
        contentType: "image/png",
      },
      Date: Date.now(),
      like: 0,
    });

    res.json({
      status: "new data created",
    });
  } catch (e) {
    console.log("error hoccge");
    res.json({
      status: "failed",
      messege: e.messege,
    });
  }
});

router.get("/instaPost", async (req, res) => {
  try {
    const data = await Blog.find({});
    const length = data.length;
    res.status(200).json({
      length,
      data,
    });
  } catch {
    res.status(400).send("an error occured while getting posts");
  }
});
module.exports = router;
