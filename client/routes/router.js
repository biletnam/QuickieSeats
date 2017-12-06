var express = require('express');
var router = express.Router();
var User = require('../models/user');


// GET /
router.get('/', function(req, res, next) {
  console.log("getting register page?");
  return res.sendFile(path.join(__dirname + '/register.html'));
});

router.post('/', function(req, res, next){
  if(req.body.password !== req.body.confPassword){
    console.log(req.body.password + " NA NI " + req.body.passwordConf);
    console.log("NANISORE?? " + req.body.password !== req.body.confPassword);
    var err = new Error('Passwords do not match');
    err.status = 400;
    res.send("Passwords do not match");
    return next(err);
  }

  if(req.body.firstname &&
    req.body.lastname &&
    req.body.emailAddress &&
    req.body.password &&
    req.body.confPassword) {

      var userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        confPassword: req.body.confPassword
      }

      User.create(userData, function(err, user){
        if(err){
          return next(err);
        }else{
          return res.redirect('/index');
        }
      });
    }
});

router.get('/index', function (req, res, next) {
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
          return res.send('<h1>Name: </h1>' + user.lastname + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});


module.exports = router;
