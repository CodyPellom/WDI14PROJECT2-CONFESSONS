const express = require('express')
const router = express.Router()
const User = require('../models/user')

// INDEX
// GET
router.get('/', (req, res) => {

  
  User.find().then((users) => {

   
    res.render('user/index', {
      users: users
    })
  })
})

// NEW
// GET
router.get('/new', (req, res) => {

 re
  res.render('user/new')
})

// CREATE
// POST
router.post('/', (req, res) => {

  
  const newUser = new User({
    name: req.body.name,
    location: req.body.location
  })

 
  newUser.save().then((savedUser) => {

   
    res.redirect(`/users/${savedUser._id}`)
  })
})


// SHOW
// GET
router.get('/:id', (req, res) => {

 
  User.findById(req.params.id).then((user) => {


    res.render('user/show', {
      user: user
    })
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

  
  User.findById(req.params.id).then((user) => {

 
    res.render('user/edit', {
      id: req.params.id,
      user: user
    })
  })
})

// UPDATE
// PUT/PATCH
router.patch('/:id', (req, res) => {

  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    location: req.body.location

  }, { new: true }).then((updatedUser) => {

   
    res.redirect(`/users/${updatedUser._id}`)
  })
})

// DESTROY
// DELETE
router.delete('/:id', (req, res) => {

  User.findByIdAndRemove(req.params.id).then(() => {
    res.redirect(`/users`)
  })
})


module.exports = router
