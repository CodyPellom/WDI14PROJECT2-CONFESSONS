require('dotenv').config()

const mongoose = require('mongoose')

const Confession = require('../models/confession')
const User = require('../models/user')


mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('open', () => {
    console.log('successfully connected to MONGO Boi!')
})

db.on('error', (err) => {
    console.log(err)
})

const confessionTest1 = new Confession({
    name: 'Test',
    information: "I farted on a stray dog through a fence",
})

const confessionTest2 = new Confession({
    name: 'Test2',
    information: "Once I cheated on my husband with a very large chimpanzee",

})

const userTest1 = new User({
name: Math.random()
})







})