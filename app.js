var express = require('express');
// var browserSync = require('browser-sync');

var bodyParser = require('body-parser');

var routes = require('./client/routes/router.js')

var path = require('path');

var mongoose  = require('mongoose');


//global.jQuery = require('jquery');
//var bootstrap = require('bootstrap');
var app = express();

mongoose.connect('mongodb://localhost/testForAuth');
var db = mongoose.connection;


//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});
// serve static files from template
app.use(express.static(__dirname + '/'));

// var bs = browserSync.create();

// bs.init({
//   proxy: "localhost:3000",
//   files : ["client/**"]
// });

//use sessions for tracking logins
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}));

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

app.use(express.static('client'));
app.use('/', routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req,res,next){
    res.status(404).end("404 not found");
});

app.listen(4000, function(){
    console.log("Server app started on port 3000");
});
