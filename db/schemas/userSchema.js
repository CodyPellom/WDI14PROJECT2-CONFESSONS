const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sodaSchema = new Schema({
  name: String,
  price: Number,
  packaging: String,
  quantitySold: Number
})

module.exports = sodaSchema
