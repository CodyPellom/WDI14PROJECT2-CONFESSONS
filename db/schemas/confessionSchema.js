const mongoose = require('mongoose')
const confessionSchema = require('./confessionSchema')
const Schema = mongoose.Schema


var ConfessionSchema = mongoose.Schema({
  name: Number,
  submit: String
  
});


module.exports = ConfessionSchema