const express = require("express");
const app = express();
const multer = require("multer");
const CORS = require("cors");
const path = require('path')
const port = 5000;

//------------------- Cross origin policy -------------------
app.use(          
  CORS({
    origin: "*",
  })
  );
//------------------- Cross origin policy -------------------



//------------------- For storing files into disk -------------------
// const storage = multer.diskStorage({      
  //   destination: "upload/videos",
  //   filename: function (req, file, cb) {
//     // get the extension of the original file name
//     const ext = path.extname(file.originalname);
//     // generate a unique name for the uploaded file
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//   },
// });
//------------------- For storing files into disk -------------------


//------------------- Configuration for multer objects  -------------------
//defining storage type for uploading file (here using memory storage)
const storage = multer.memoryStorage();

// Define file filter
const fileFilter = function (req, file, cb) {
  // Accept video files only
  if (file.mimetype.startsWith("video/")) {         //after video/ there are mp4, webm etc for specific limitations
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};
//------------------- Configuration for multer objects  -------------------



//------------------- Multer configuration defined into a instance -------------------
// Initialize upload middleware with options
const videoUpload = multer({                    //multer instance to upload file which will take care of fileType and storage type for files
  storage: storage,
  fileFilter: fileFilter,
});
//------------------- Multer configuration defined into a instance -------------------



//------------------- Routes -------------------
app.get("/", (req, res) => res.send("Hello World!"));


app.post("/upload", videoUpload.array('file', 5),(req, res) => {        //fieldname is the name of the object that was attached with the form data while sending from the frontend to the server. So need to use the same object name here too (i.e: file)
  console.log(req.body);
  console.log(req.file);      //here you will see there is a seperate file object attached to req 
});
//------------------- Routes -------------------


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
