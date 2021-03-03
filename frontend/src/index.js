import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// import React, { useState } from "react";
// import axios from "axios";
// import Alert from './Alert';

// function FileUpload() {  
//     const [fileData, setFileData] = useState("");
//      const [successMsg,setSuccessMsg] = useState('');  
// const getFile = (e) => {
//   setFileData(e.target.files[0]);
// };

// const uploadFile = (e) => { 
//     e.preventDefault();   
//     const data = new FormData();
//     data.append("file", fileData);
// const options={
//   // onUploadProgress: progressEvent => {
// //   setUploadPercentage(
// //     parseInt(
// //       Math.round((progressEvent.loaded * 100) / progressEvent.total)
// //     )
// //   );

// //   // Clear percentage
// //   setTimeout(() => setUploadPercentage(0), 10000);
// // }
// // }); 
// }
         
//     axios({
//       method: "POST",
//       url: "http://localhost:8000/upload",
//       data: data,
//     }).then((res) => {       
//         setSuccessMsg("The file is successfully uploaded");
//     });
    
//   };  
   
//   return (
    
//     <form onSubmit={uploadFile}>

//     <h1>File Upload</h1>
//             <Alert msg={successMsg} type="success" />
//       <input type="file" name="file" onChange={getFile} required />
//       <input type="submit" name="upload" value="Upload" />
//     </form>
//   );
 
// }
//  export default FileUpload;

