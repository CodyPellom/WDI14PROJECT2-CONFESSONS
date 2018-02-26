var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/confessions');

var submissionSchema = mongoose.Schema({
   name: Number,
   Submit: Number
   
});

var Submission = mongoose.model("Submission", submissionSchema);

app.get('/confessions/index', function(req, res){
   Submission.find(function(err, response){
      res.json(response);
   });
});

app.listen(3000);