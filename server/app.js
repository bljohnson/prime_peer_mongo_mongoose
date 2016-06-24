var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false}); // NOT SURE IF I NEED THIS FOR MONGODB.... required in order to POST (app.post)
app.use(bodyParser.json()); // parse text as JSON to req.body
var mongoose = require('mongoose');
mongoose.connect('localhost:/27017/peerchallengedb'); // 27017 is default mongo port

// spin up server
app.listen(3000, 'localhost', function (req, res) {
  console.log('Now serving 3000');
});

// make public folder static
app.use(express.static('public'));

// base URL
// logs to Atom terminal since coming from server side
app.get('/', function (req, res) {
  console.log('in base URL');
  res.sendFile(path.resolve('views/index.html')); // gets this path and sends to base URL as response
});
