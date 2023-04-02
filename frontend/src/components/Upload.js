import React, { useState } from "react";
import "./Upload.css";
import axios from "axios";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null); // this is the file that is selected
  const [isFileSelected, setIsFileSelected] = useState(false); // this is a boolean to check if a file is selected or not

  const changeSelection = async (e) => {
    // this function is called when a file is selected or changed in the input
    const file = await e.target.files;
    setSelectedFile(file);
    setIsFileSelected(true);
    console.log(file); // this is the file that is selected
  };

  const uploadFile = () => {
    console.log("uploading files");
    const data = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
      data.append(`file`, selectedFile[i]);           //be carefull while using the fieldname
    }
    axios
      .post("http://localhost:5000/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log({ status: res.statusText, data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="uploadSection">
      <h1>Upload</h1>
      <input
        id="input_file"
        name="file"                     //its the fieldname be carefull i.e: needs update on server side too 
        onChange={changeSelection}
        type="file"
        multiple
      />
      <button id="submit" onClick={uploadFile}>
        Submit
      </button>
    </div>
  );
}

export default Upload;
