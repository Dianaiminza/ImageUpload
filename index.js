
var express=require('express');
var path = require('path');
var app =express();
var multer  = require('multer');
var cors = require('cors');
const sharp = require('sharp');
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(cors());
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);  
    }
    // filename: function(req, file, cb) {
    //     cb(null, file.fieldname + '-' + Date.now());
    // }
});
var upload = multer({ storage: storage });
// var upload = multer({ storage: storage }).array('files');
app.post('/upload', upload.single('file'), function (req, res, next) {
    const host = req.hostname;
    // return res.json(req.file);
const filePathOriginal = req.protocol + "://" + host + ':8000/uploads/' + req.file.filename;
const filePathThumbnail = req.protocol + "://" + host + ':8000/uploads/thumbnail/' + req.file.filename;
const filePathPreview = req.protocol + "://" + host + ':8000/uploads/preview/' + req.file.filename;

sharp(__dirname + '/uploads/'+req.file.filename).resize(200,200) // TODO: use req.file.filename
.jpeg({quality : 50}).toFile(__dirname  
    + '/uploads/thumbnail/'+req.file.filename); // TODO use thumb folder and set name to req.file.filename
sharp(__dirname + '/uploads/'+req.file.filename).resize(640,480) 
.jpeg({quality : 80}).toFile(__dirname  
    + '/uploads/preview/'+req.file.filename);  // TODO use preview folder and set name to req.file.filename
    
return res.json({ // TODO: return imgage that is  with preview and thumbnail
    origianl: filePathOriginal,
    preview:filePathPreview,
    thumbnail:filePathThumbnail,
     filePath: `uploads/${req.file.filename}`
});
})
app.post('/multiple',upload.array('file',9),(req,res)=>{ 
    let results = req.files.map(oneFile =>{
        const host = req.hostname;   
        const filePathOriginal = req.protocol + "://" + host + ':8000/uploads/' + oneFile.filename;
        const filePathThumbnail = req.protocol + "://" + host + ':8000/uploads/thumbnail/' + oneFile.filename;
        const filePathPreview = req.protocol + "://" + host + ':8000/uploads/preview/' +oneFile.filename;
         const filePathCompressed=req.protocol + "://" + host + ':8000/uploads/compressed/' +oneFile.filename;
        sharp(__dirname + '/uploads/'+oneFile.filename).resize(200,200)
        .jpeg({quality : 50}).toFile(__dirname  
            + '/uploads/thumbnail/'+oneFile.filename); 
        sharp(__dirname + '/uploads/'+oneFile.filename).resize(640,480) 
        .jpeg({quality : 80}).toFile(__dirname  
            + '/uploads/preview/'+oneFile.filename); 
            sharp(__dirname + '/uploads/'+oneFile.filename).resize(200,200) 
        .jpeg({chromaSubsampling:'4:4:4',quality:50}).toFile(__dirname  
            + '/uploads/compressed/'+oneFile.filename); 
            return {
                origianl: filePathOriginal,
    preview:filePathPreview,
    thumbnail:filePathThumbnail,
    compressed:filePathCompressed,
    filePath: `uploads/${oneFile.filename}`
     
            }
    })   
return res.json(
    results
    
);
   //res.send(req.files)  
})

app.listen(8000, function(){
  console.log("server is listening on port: 8000");
});
module.exports = app;

