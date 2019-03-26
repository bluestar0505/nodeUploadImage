const express = require('express');
//const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../db/user');

router.get('/signin', (req, res)=>{
  res.render('signin', { title: 'Signin Page' });
});

function setUserIdCookie(req, res, user) {
  const isSecure = req.app.get('env') != 'development';
  res.cookie('user_id', user, {
    httpOnly:true,
    secure: isSecure,
    signed:true,
  });
}

router.post('/signin', (req, res, next)=>{
  console.log(req.body);
  if(User.validateSigninUser(req.body)) {
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        if(user) {
          //bcrypt
          //.compare(req.body.password, user.password)
          //.then(function(result) {
          //if(result) {
              setUserIdCookie(req, res, user.id);
              res.json({
                //result, 
                id: user.id,
                message: "Logging in!",
              });
            //}
          //});
        } else {
          next (new Error('Invalid Login'));
        }
      });
  } else {
    next(new Error('Invalid User'));
  }
});

router.get('/signup', (req, res)=>{
  res.render('signup', { title: 'Signup Page' });
});

router.post('/signup', (req, res, next)=>{
  if(User.validateSignupUser(req.body)) {
    console.log('body', req.body);
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        console.log('user', user);
        //this is a unigue email

        if(!user) {
          //hash password
        //bcrypt.hash(req.body.password, 12, function(err, hash) {
          // Store hash in your password DB.
        //});

        //bcrypt.hash(req.body.password, 10)
        //  .then( function(hash) {
            //insert user info to db
            const user = {
              email: req.body.email,
              //password: HashChangeEvent,
              password: req.body.password,
              created_at: new Date()
            };

            User
              .create(user)
              .then(id => {
                setUserIdCookie(req, res, id);
                  //redirect 
                  res.json({
                    id,
                    message: "Registered Now!",
                  });
              });
        //});
        } else {
          next (new Error('Email in use'));
        }
      });
  } else {
    next(new Error('Invalid User'));
  }
});

router.get('/signout', (req, res)=>{
  res.clearCookie('user_id');
  res.json({
    message: "Logout!",
  });
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
