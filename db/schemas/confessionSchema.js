const mongoose = require('mongoose')
const confessionSchema = require('./confessionSchema')
const Schema = mongoose.Schema


var submissionSchema = mongoose.Schema({
  name: Number,
  submit: String
  
});
var Submission = mongoose.model("Submission", submissionSchema);