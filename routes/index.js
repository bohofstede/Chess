var express = require('express');
var router = express.Router();

/* GET home page. */
app.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  // need to agree on a common root folder
  res.sendFile("splash.html", {root: "C:\Users\Bo Hofstede\IdeaProjects\Chess\public"});
});

// app.get('/game', function(req, res, next) {
//   //res.render('index', { title: 'Express' });
//   res.sendFile("game.html", {root: "C:\Users\Bo Hofstede\IdeaProjects\Chess\public"});
// });


module.exports = router;
