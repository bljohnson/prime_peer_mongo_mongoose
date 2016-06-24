var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Assignment = require('../models/studentassignments'); // require model
// mongoose.connect('localhost:/27017/peerchallengedb'); // 27017 is default mongo port

var mongoURI = "mongodb://localhost:27017/assignments"; // URL to the mongo database
var MongoDB = mongoose.connect(mongoURI).connection; // connects to db

var urlencodedParser = bodyParser.urlencoded({extended:false}); // required in order to POST (app.post)
app.use(bodyParser.json()); // parse text as JSON to req.body

MongoDB.on('error', function (err) { // when connection errors out
    console.log('mongodb connection error:', err);
});
MongoDB.once('open', function () { // when able to connect to db
  console.log('mongodb connection open!');
});

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

// get call
app.get( '/getRecords', function( req, res ){
  Assignment.find()
  .then( function( data ){
    res.send( data );
  });
});

//dummy-value get route. Dummy value meaning
//'hard coded' Millie
// app.get('/millie', function(req, res) {
//   var millie = new Assignment({
//     student_name: 'Millie',
//     assignment_number: 1,
//     score: 60,
//     date_completed: 2016-06-24
//   });
//
//   millie.save(function(err) {
//     if(err){
//       console.log(err);
//       res.sendStatus(500);
//     }else{
//       console.log('User saved successfully!');
//       res.sendStatus(200);
//     }
//   });
// });//end millie get route

// create post route to db
app.post('/postAssignment', function(req, res) {
  console.log('hit create route');
  console.log('req.body = ', req.body);

  var newAssignment = new Assignment({ // creates object to store in db using object received by server
    student_name: req.body.name,
    assignment_number: req.body.assignment,
    score: req.body.score,
    date_completed: new Date(req.body.date) // property names need to match model schema
  });

  newAssignment.save(function(err) { // saves object to db. .save is method specific to mongoose
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('Assignment saved successfully!');
      res.sendStatus(200);
    }
  });
});
