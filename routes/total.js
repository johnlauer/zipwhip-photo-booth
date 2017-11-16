var express = require('express');
 var router = express.Router();
 var busboy = require('connect-busboy');
 var path = require('path');     //used for file path
 var fsExtra = require('fs-extra');
 var fs = require('fs');
 
 var i = 0;
 var lastFileName;
 router.get("/",function (req, res) {
   var path = '/images/booth/';
   var filename = "";
   
             
               fs.readdir("public" + path, writeFileAndUploadToCloud);
             function writeFileAndUploadToCloud(err, filenames){
               
               if(!filenames || filenames.length < 1){
                 filename = "0";
               }else if(filenames && filenames.length > 0){
                  
                 var filenameNumbers = [];
                 for(var i = 0; i < filenames.length; i++){
                    filenameNumbers.push(parseInt(filenames[i].substring(0, filenames[i].indexOf('.')+1)));
                 }
                 filenameNumbers.sort(function (a, b) {
                    if (a < b) return -1;
                    else if (b < a) return 1;
                    return 0;
                  });

                 filename = filenameNumbers[filenameNumbers.length -1]
               }
  
       console.log('totalfiles', filename);
       res.send({total: filename, url: path});
    }             
   });
 
 module.exports = router;