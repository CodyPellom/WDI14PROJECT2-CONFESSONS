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
    name: 76476477,
    submit: "I voted for trump. I'm not sorry. ",

})

const confessionTest3 = new Confession({
  name: 76476478,
  submit: "I work at a bowling alley. In my spare time, I sniff the soles of strangers shoes. ",

})

const confessionTest4 = new Confession({
  name: 76476479,
  submit: "Once I cheated on my husband with his brother. His brother is my father. ",

})

const confessionTest5 = new Confession({
  name: 76476480,
  submit: "I actually really really really like one direction",

})

const confessionTest6 = new Confession({
  name: 76476481,
  submit: "Once I was speeding down the interstate and I hit a hobo. I turned his body into chili and won the county competition. The horror.. The horror.",

})

const confessionTest7 = new Confession({
  name: 76476482,
  submit: "I'm a catholic priest who has been an atheist for 20 years. I do it for the boys and the money.",

})


Confession.remove().then(() => {

    // THEN save multiple companies to the database
    return Confession.insertMany([ confessionTest1, confessionTest2, confessionTest4, confessionTest5, confessionTest6, confessionTest7 ])
  }).then(() => {
  
    // THEN close the database
    console.log('Saved Successfully')
    db.close()
  }).catch((err) => {
  
    // If there are any errors, log it and then close the DB
    console.log(err)
    db.close()
  })



  