const express = require('express');
const app = express();
const router = express.Router();
//const share_route = require('./share');
const User = require('../db/user');
const Image = require('../db/images');
var multer  = require('multer');
var logined_user;
var result;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!isNaN(req.signedCookies.user_id)) {
    User.getOne(req.signedCookies.user_id).then(user => {
        if (user) {
          console.log('user', user);
          res.render('index', { user: user});
        } else {
          res.render('index');
        }
    });
  }  else {
    res.render('index');
  }
});

var upload = multer({ dest: './public/imgs' }).single('imageFile');
router.post('/',  upload, function(req, res, next) {
  if(!isNaN(req.signedCookies.user_id)) {
    User.getOne(req.signedCookies.user_id).then(user => {
      if (user) {
        logined_user = user;
        console.log(req.file);
        if (! req.file) {
          result = {
            status: "fail",
            message: "No file were uploaded.", 
          };
          res.render('index', {result:  result, user:  logined_user});
        } else  {
          const image = {
            file_name : req.file.filename,
            lat : req.body.latitude,
            lng : req.body.longitude,
            user_id : req.signedCookies.user_id
          };
      
          if(Image.validateUploadImage(image)) {
            Image
              .create(image)
              .then(id => {
                  //redirect 
                result = {
                    id: id,
                    status: 'success',
                    message: "Image Uploaded Now!",
                  };
                  res.render('index', {result:  result, user:  logined_user});
              });
          } else {
            result = {
              status: "fail",
              message: "Incorrect Image Information", 
            };
            res.render('index', {result:  result, user:  logined_user});
          }
        }
      } else {
        result = {
          status: 'fail',
          message: "Please Login! ",
        };
        res.render('index', {result:  result});
      }
    });
  }  else {
    result = {
      status: 'fail',
      message: "Please Login!",
    };
    res.render('index', {result:  result});
  }
});

module.exports = router;

