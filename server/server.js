const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(fileupload({ createParentPath: true }));
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 

app.post('/upload1', (req, res) => {
    console.log(req.body);
});


app.post("/upload", (req, res) => {
  const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;
 
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    res.status(200).send({ message: "File Uploaded", code: 200 });
  });
});

app.get('/', (req,res)=>{
    res.send('Hello World');
})
 
app.listen(4443, () => {
  console.log("Server running successfully on 4443");
});