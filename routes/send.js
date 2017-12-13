var express = require('express');
var router = express.Router();
var busboy = require('connect-busboy');
var path = require('path'); //used for file path
var fsExtra = require('fs-extra');
var fs = require('fs');
var querystring = require('querystring');
var http = require('http');
//var zipwhip = require('Zipwhip').Zipwhip('3b181e2a-f244-42f5-b195-e3895cf65407:209624403');
// var zipwhip = require('Zipwhip').Zipwhip('67f2bb6c-15c4-43bd-95a8-5eed0cd066d8:332515203');
var zipwhip = require('Zipwhip').Zipwhip('3c59467d-04d3-4747-a1ab-518ed7cedfc9:303273303');

var i = 0;

// ATT Network Carbon - (425) 241-1497
//var session = 'a7e0520f-de76-43d8-af35-2815e343e797:237274304';

// Ice Luge - (844) 564-6528
//var session = '71a6ca0f-10ee-4904-83e9-ba5ef5f319a2:259476803';

// 844-947-4444
//var session = '8a9c3f77-446a-45f1-8e84-04913ab5caee:301551902';

//title boxing
// var session = '67f2bb6c-15c4-43bd-95a8-5eed0cd066d8:332515203';

// john lauer desk phone
var session = '3c59467d-04d3-4747-a1ab-518ed7cedfc9:303273303';
console.log("using session:", session);

// Hostname
var hostname = 'network.zipwhip.com';


function uploadPhoto(path, phone) {
  var postFile = require('file-poster'),
    url = require('url'),
    assert = require('assert');

  var options = url.parse('http://' + hostname +
    '/hostedContent/save/?session=' + session);
  options['method'] = 'POST';

  console.log("LWIP will open path: ", path);

  require('lwip').open(path, function(err, image) {

    // copy another file to drop folder for dnp ds40 printer
    console.log("about to copy for the extra drag drop folder for chris rosa ds40");
    image.batch().pad(100, 100, 100, 100, "white").writeFile('C:/DNP/Hot Folder/Prints/4x6/output.jpg',
      function(err) {
        console.log("copied image to drop hot folder. err:", err);
      
        console.log("Path opened and about to scale and write it out");
        // check err...
        // define a batch of manipulations and save to disk as JPEG:
        image.batch()
          .scale(0.75)
          .writeFile('c:/zipwhip-photo-booth/public/images/output.jpg',
            function(err) {
    
              
    
              console.log("about to post file to zipwhip. err:", err);
              postFile('public/images/output.jpg', options, function(err, res) {

                if (res && res.body) {
                  var response = JSON.parse(res.body);
                  console.log(response.response.url)
                  sendMessage(response.response.url, 'images/output.jpg',
                    phone);
                  /*fs.unlink(path, function (err) {
                    if (err) throw err;
                    console.log('successfully deleted '+path);
                  });*/
                  assert.equal(res.statusCode, 200);
                  assert.equal(err, null);
                } else {
                  console.log("did not connect to zipwhip to send. error.");
                }
                
              });
            }
          );

      }
    );

    

    // console.log("about to copy for the extra drag drop folder for chris rosa ds40");
    // // copy another file to drop folder for dnp ds40 printer
    // image.batch()
    //   .scale(0.75)
    //   .writeFile('C:/DNP/Hot Folder/Prints/4x6/output.jpg',
    //     function(err) {
    //       console.log("copied image to drop hot folder. err:", err);
    //     }
    //   );
    

  });



}

function sendMessage(storageKey, path, phone) {

  //var path = '/message/send/?session='+session+'&contacts='+encodeURIComponent('ptn:/'+phone)+'&body='+encodeURIComponent('Your pics from the Photo Booth thanks to your friends at Zipwhip.')+'&fromAddress=0&attachment='+storageKey

  // var path = '/messaging/send/?session=' + session + '&to=' +
  //   encodeURIComponent('+1' + phone) + '&body=' + encodeURIComponent(
  //     'Post your pics with #FindYourRhythmTBC') + '&key=' + storageKey
  var path = '/messaging/send/?session=' + session + '&to=' +
    encodeURIComponent('+1' + phone) + '&body=' + encodeURIComponent(
      'Zipwhip Christmas Party 2017') + '&key=' + storageKey

  var options = {
    host: hostname,
    path: path,
    port: 80,
    method: 'GET'
  };

  var callback = function(response) {
    var str = '';

    //another chunk of data has been received, so append it to `str`
    response.on('data', function(chunk) {
      str += chunk;
    });

    //the whole response has been received, so we just print it out here
    response.on('end', function() {
      console.log(str);
    });
  }

  http.request(options, callback).end();
}

router.post("/", function(req, res) {
  var path = '/images/booth/';
  var filename = "";
  var phone;
  req.pipe(req.busboy);
  req.busboy.on('file', function(fieldname, file, filename) {
    fs.readdir("public" + path, writeFileAndUploadToCloud);

    function writeFileAndUploadToCloud(err, filenames) {

      if (!filenames || filenames.length < 1) {
        filename = "0";
      } else if (filenames && filenames.length > 0) {

        var filenameNumbers = [];
        for (var i = 0; i < filenames.length; i++) {
          filenameNumbers.push(parseInt(filenames[i].substring(0,
            filenames[i].indexOf('.') + 1)));
        }
        filenameNumbers.sort(function(a, b) {
          if (a < b) return -1;
          else if (b < a) return 1;
          return 0;
        });

        filename = filenameNumbers[filenameNumbers.length - 1] + 1;
      }

      console.log(filename);
      //Path where image will be uploaded
      path = path + filename + ".png";

      var fstream = fsExtra.createWriteStream("public" + path);
      file.pipe(fstream);
      fstream.on('close', function() {
        uploadPhoto("public" + path, phone);
        console.log("Upload Finished of " + path);

        res.send({
          total: parseInt(filename),
          url: path
        });
      });
    }
  });

  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    if (key == 'phone') {
      phone = value;
    }
  });
});

module.exports = router;
