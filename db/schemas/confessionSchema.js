const mongoose = require('mongoose')
const Schema = mongoose.Schema

const confessionSchema = new Schema({
  name: Number,
  confession: String,
  // This sets up a one to many relationship
})

module.exports = confessionSchema

