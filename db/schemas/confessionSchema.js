const mongoose = require('mongoose')
const confessionSchema = require('./confessionSchema')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: Number,
  // This sets up a one to many relationship
})

module.exports = userSchema


Soda = Confession; Company = User;