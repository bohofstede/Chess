var express = require('express');
var router = express.Router();

/* GET home page. */
app.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile("splash.html", {root: "C:\Users\leozi\myapp\public"});
});


module.exports = router;
