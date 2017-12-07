var express = require('express');
// var browserSync = require('browser-sync');
var bodyParser = require('body-parser');
var routes = require('./client/routes/router.js')
var path = require('path');
var session = require('express-session');
var mongoose  = require('mongoose');
var MongoStore = require('connect-mongo')(session);

//global.jQuery = require('jquery');
//var bootstrap = require('bootstrap');
var app = express();



mongoose.connect('mongodb://localhost/myApp');
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected");
});
// serve static files from template
app.use(express.static(__dirname + '/'));


// var bs = browserSync.create();
// include routes


// bs.init({
//   proxy: "localhost:3000",
//   files : ["client/**"]
// });

//use sessions for tracking logins
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));


app.use(express.static('client'));
app.use('/', routes);


app.use(function(req,res,next){
    res.status(404).end("404 not found");
});

app.listen(4000, function(){
    console.log("Server app started on port 3000");
});
