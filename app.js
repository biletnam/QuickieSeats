var express = require('express');
var browserSync = require('browser-sync');

//global.jQuery = require('jquery');
//var bootstrap = require('bootstrap');
var app = express();

app.use(express.static('client'));

var bs = browserSync.create();

bs.init({
  proxy: "localhost:4000",
  files : ["client/**"]
});

app.use(function(req,res,next){
    res.status(404).end("404 not found");
});

app.listen(4000, function(){
    console.log("Server app started on port 3000");
});
