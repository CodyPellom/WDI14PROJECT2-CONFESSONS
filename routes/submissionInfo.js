var express = require('express');
var app = express();
var Submission = require('../models/submission')

app.get('/confessions/index', function(req, res){
   Submission.find(function(err, response){
      res.json(response);
   });
});

app.listen(3000);