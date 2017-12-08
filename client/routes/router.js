var express = require('express');
var router = express.Router();
var User = require('../models/user');


// GET /
router.get('/register', function(req, res, next) {
  console.log("getting register page?");
  return res.sendFile(path.join(__dirname + '/register.html'));
});

router.get('/', function(req, res, next) {
  console.log("getting index page?");
  return res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/register', function(req, res, next){
  if(req.body.password !== req.body.passwordConf){
    console.log(req.body.password + " NA NI " + req.body.passwordConf);
    var err = new Error('Passwords do not match');
    err.status = 400;
    res.send("Passwords do not match");
    return next(err);
  }

  if(req.body.firstname &&
    req.body.lastname &&
    req.body.emailAddress &&
    req.body.password &&
    req.body.passwordConf) {

      var userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        passwordConf: req.body.passwordConf
      }

      User.create(userData, function(err, user){
        if(err){
          return next(err);
        }else{
          console.log("User created?");
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
    }
});

router.post('/login', function(req,res,next){
  if (req.body.logemail && req.body.logpassword) {
    console.log("words are in the input");
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        console.log("userlogged");
        return res.render('../views/logged.ejs', {retrievedData: user.firstname});
      }
    });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});


router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          console.log("Proceeding to login");
          return res.render('../views/logged.ejs', {retrievedData: user.firstname});
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
