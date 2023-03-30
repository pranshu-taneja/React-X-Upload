import React, { useState } from 'react'
import './Upload.css'

function Upload() {

    const [selectedFile, setSelectedFile] = useState(null);         // this is the file that is selected
    const [isFileSelected, setIsFileSelected] = useState(false);    // this is a boolean to check if a file is selected or not

    const changeSelection = async(e) => {    // this function is called when a file is selected or changed in the input
        const file = await e.target.files[0]
        setSelectedFile(file);
        setIsFileSelected(true);
        console.log(file)            // this is the file that is selected
    }

    const uploadFile = () => {              // this function is called when the submit button is clicked
        console.log('uploading file');
    }

    return (
    <div id='uploadSection'>
        <h1>Upload</h1>
        <input id='input_file' onChange={changeSelection} type="file" />

        <button id='submit' onClick={uploadFile}>Submit</button>
    </div>
  )
}

export default Upload 