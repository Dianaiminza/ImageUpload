
var express=require('express');
var path = require('path');
var app =express();
var multer  = require('multer');
var cors = require('cors');
const sharp = require('sharp');
const fs = require("fs");
const mv = require('mv');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors());
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
     },
    // filename: function (req, file, cb) {
    //     cb(null , file.originalname);
        
    // }
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });
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
    //const file = req.files.file;
return res.json({ // TODO: returm imgee thath with preview and thumbnail
    origianl: filePathOriginal,
    preview:filePathPreview,
    thumbnail:filePathThumbnail,
    filePath: `uploads/${req.file.filename}`
    
});
})

app.listen(8000, function(){
  console.log("server is listening on port: 8000");
});
module.exports = app;

