// var browserSync = require('browser-sync');
//let path = require('path');
//let session = require('express-session');
//let MongoStore = require('connect-mongo')(session);
let express = require('express');
let mongoose  = require('mongoose');
let bodyParser = require('body-parser');
let router = require('./public/router.js');

let app = express();

// set the view engine to ejs
//app.set('view engine', 'ejs');

//global.jQuery = require('jquery');
//var bootstrap = require('bootstrap');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Old Stuff
// app.use(express.static('client'));
// app.use('/', routes);

// serve static files from template
app.use(express.static('./public'));
app.use("/api", router);

mongoose.connect('mongodb://localhost/quickie-seats',{
  useMongoClient: true
});

mongoose.promise = Promise;

//handle mongo error
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   we're connected!
//   console.log("Connected");
// });


// var bs = browserSync.create();
// include routes


// bs.init({
//   proxy: "localhost:3000",
//   files : ["client/**"]
// });

//use sessions for tracking logins
// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: false,
//   store: new MongoStore({
//     mongooseConnection: db
//   })
// }));

app.use("*", function(req,res,next){
    res.status(404).end("404 not found go cry.");
});

app.listen(3000, function(){
    console.log("Server app started on port 3000");
});
