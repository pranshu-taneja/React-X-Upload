const express = require("express");
const app = express();
const multer = require("multer");
const CORS = require("cors");
const path = require('path')
const port = 5000;

app.use(
  CORS({
    origin: "*",
  })
);

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: "upload/videos",
  filename: function (req, file, cb) {
    // get the extension of the original file name
    const ext = path.extname(file.originalname);
    // generate a unique name for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Define file filter
const fileFilter = function (req, file, cb) {
  // Accept video files only
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};

// Initialize upload middleware with options
const videoUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

app.get("/", (req, res) => res.send("Hello World!"));


app.post("/upload", videoUpload.array('file', 5),(req, res) => {        //fieldname is basically the name/category of the file that will be uploaded from the client as formdata appended data. WHich will eventually gets attached as the same name object with the req object in the HTTP request. FOr example you used a fieldname as 'file', in teh server and as well as in the frontend then this 'file' object will gets attached to the req. Which will eventually be uploaded on the server by the multer middleware which basically intercepts the req before they get processed then you can use use req and res and blah blah blah
  res.send('file Uploaded!!')
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
