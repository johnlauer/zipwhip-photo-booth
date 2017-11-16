var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
	var files = 0;
	var path = 'public/images/booth/';
	fs.readdir(path, writeFileAndUploadToCloud);
    function writeFileAndUploadToCloud(err, filenames){
          console.log(filenames)
          if(filenames && filenames.length < 1){
            files = 0;
          }else if(filenames && filenames.length > 0){
            var lastFileName = filenames[filenames.length -1]
            files = parseInt(lastFileName.substring(0, lastFileName.indexOf('.')+1));
          }else{
             files = 0;
          }
          console.log(files);
 		  res.render('index', { title: 'Express', totalFiles: files});
		}
});

module.exports = router;
