const mongoose = require('mongoose')
const confessionSchema = require('../db/schemas/confessionSchema')



const Confession = mongoose.model('confession', confessionSchema)

module.exports = Confession
