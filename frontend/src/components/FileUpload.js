import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import Dropzone from "react-dropzone";
const FileUpload = () => {
  const [files, setFile] = useState([]);
  const [filenames, setFilenames] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

   const handleDrop = acceptedFiles =>
    setFilenames(acceptedFiles.map(file => file.name));

    const onChange = e => {
      setFile(e.target.files);
    };
    //  console.log(files)
    const onSubmit = async e => {
      e.preventDefault();
      const formData = new FormData();
      for(var x = 0; x<files.length; x++) {
        formData.append('file', files[x])
    }
    //  console.log(formData.get('file'));
    try {
      const res = await axios.post("/multiple", formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });
      // console.log(res.data)
      // console.log(files)
      //  const { fileName, filePath,preview,thumbnail,original } = res.data;
      // files({ fileName, filePath,preview,thumbnail,original });
      setUploadedFiles(res.data)
      setMessage('File Uploaded');
    } catch (err) {
      if (err) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form  onSubmit={onSubmit} >
        <div>
        <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} 
            onChange={onChange}
            /> 
            <p>Drag'n'drop files, or click to select file</p>
            {/* {filenames}  */}
           
          </div>
          
        )}
        
      </Dropzone>
      <div>
        <ul>
          {filenames.map(fileName => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
      </div>
      </div>
        <Progress percentage={uploadPercentage} />
        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4' 
        />
      </form>     
<div className="image">
<table name="image">
<tr>
  <th>Original</th>
  <th>Preview</th>
  <th>Thumbnail</th>
</tr>
<tbody>
{uploadedFiles.map(file =>(
  <tr>
      <td><img style={{ width: '50%' }} src={file.original} alt='' /></td>
      <td><img style={{ width: '50%' }} src={file.preview} alt='' /></td>
      <td><img style={{ width: '50%' }} src={file.thumbail} alt='' /></td>
    </tr>
  ))}
  </tbody>
 </table>
</div> 
    </Fragment>
    
  );
  
};
export default FileUpload;

