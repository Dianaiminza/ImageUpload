
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
    //     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    // }
});
var upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), function (req, res, next) {
    const host = req.hostname;
    // return res.json(req.file);
const filePath = req.protocol + "://" + host + ':8000/uploads/' + req.file.filename;
sharp(__dirname + '/uploads/health.jpg').resize(200,200) 
.jpeg({quality : 50}).toFile(__dirname  
    + '/uploads/health_thumb.jpg'); 
sharp(__dirname + '/uploads/health.jpg').resize(640,480) 
.jpeg({quality : 80}).toFile(__dirname  
    + '/uploads/health_preview.jpg'); 
    sharp(__dirname + '/uploads/image.png').resize(200,200) 
.jpeg({quality : 50}).toFile(__dirname  
    + '/uploads/image_thumb.jpg'); 
sharp(__dirname + '/uploads/image.png').resize(640,480) 
.jpeg({quality : 80}).toFile(__dirname  
    + '/uploads/image_preview.jpg'); 
    sharp(__dirname + '/uploads/butterfly.jpg').resize(200,200) 
.jpeg({quality : 50}).toFile(__dirname  
    + '/uploads/butterfly_thumb.jpg'); 
sharp(__dirname + '/uploads/butterfly.jpg').resize(640,480) 
.jpeg({quality : 80}).toFile(__dirname  
    + '/uploads/butterfly_preview.jpg'); 
  // req.file is the `avatar` file
return res.json({
    path: filePath
});

})
//image compression with tiny API
// Make a new image


app.listen(8000, function(){
  console.log("server is listening on port: 8000");
});
module.exports = app;
