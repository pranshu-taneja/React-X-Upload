const express = require("express");
const app = express();
const multer = require("multer");
const CORS = require("cors");
const path = require("path");
const dotenv = require('dotenv').config()
const port = process.env.PORT;

//------------------- Cross origin policy -------------------
app.use(
  CORS({
    origin: "*",
  })
);
//------------------- Cross origin policy -------------------

//------------------- Error handling middleware for multer uploading -------------------
app.use("/upload", (err, req, res, next) => {
  if (err) {
    console.log(err, "working");
    res.status(500).send({ err });
  }
});
//------------------- Error handling middleware for multer uploading -------------------

// //------------------- For storing files into disk -------------------
// const storage = multer.diskStorage({
//     destination: "upload/videos",          //file destination define
//     filename: function (req, file, cb) {       //file name defining
//     // get the extension of the original file name
//     const ext = path.extname(file.originalname);
//     // generate a unique name for the uploaded file
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//   },
// });
// //------------------- For storing files into disk -------------------

//------------------- Configuration for multer objects  -------------------
//defining storage type for uploading file (here using memory storage)
const storage = multer.memoryStorage();

// Define file filter
const fileFilter = function (req, file, cb) {
  // Accept video files only
  if (file.mimetype.startsWith("video/")) {
    //after video/ there are mp4, webm etc for specific limitations
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};
//------------------- Configuration for multer objects  -------------------

//------------------- Multer configuration defined into a instance -------------------
// Initializing videoUpload multer instance with configurations objects
const videoUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
//------------------- Multer configuration defined into a instance -------------------

//------------------- Routes -------------------
app.get("/", async (req, res) => res.send("Hello World!"));

app.post("/upload", videoUpload.array("file", 5), async (req, res) => {
  //fieldname is the name of the object that will get attached with the `req.files` object after being received like there will be objects with fieldnames sended
  console.log({ "req.body": req.body });      //will only show up if there is text data  attached with the body
  console.log({ "req.files": req.files }); //here you will see there is a seperate file object attached to req
  res.send("file Uploaded!!");
});
//------------------- Routes -------------------

//------------------- Listen to express server -------------------
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
