require('dotenv').config()

const mongoose = require('mongoose')

const Confession = require('../models/confession')
const User = require('../models/user')



mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('open', () => {
  console.log('Successfully connected to mongoDB')
})
db.on('error', (err) => {
  console.log(err)
})

const confessionTest1 = new Confession({
    name: 76476476,
    submit: "I farted on a stray dog through a fence",
})

const confessionTest2 = new Confession({
    name: 555,
    submit: "Once I cheated on my husband with a very large chimpanzee",

})


Confession.remove().then(() => {

    // THEN save multiple companies to the database
    return Confession.insertMany([ confessionTest1, confessionTest2 ])
  }).then(() => {
  
    // THEN close the database
    console.log('Saved Successfully')
    db.close()
  }).catch((err) => {
  
    // If there are any errors, log it and then close the DB
    console.log(err)
    db.close()
  })



  