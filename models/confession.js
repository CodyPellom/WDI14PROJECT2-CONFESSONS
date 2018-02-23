const mongoose = require('mongoose')
const confessionSchema = require('../db/schemas/confessionSchema')

// Apply existing schema to a mongoose model names soda.
// This gives us the ability to use methods like findById, create, etc
const Confession = mongoose.model('confession', confessionSchema)

module.exports = Confession
