const express = require('express')
const router = express.Router()
const User = require('../models/user')

// INDEX
// GET
router.get('/', (req, res) => {

  // Get All Companies
  User.find().then((users) => {

    // Send all the companies to the hbs file called index in the views/company directory
    res.render('user/index', {
      users: users
    })
  })
})
//user = company; confession = soda;
// NEW
// GET
router.get('/new', (req, res) => {

  // Just render a view, we don't need to inject any data from our server here
  res.render('user/new')
})

// CREATE
// POST
router.post('/', (req, res) => {

  // Create a new company and make sure we are ONLY looking at the 
  // pieces of req.body that we need in order to save to the DB
  // Data from req.body is coming from the HTML form
  const newUser = new User({
    name: req.body.name,
    location: req.body.location
  })

  // Save the new company
  newUser.save().then((savedUser) => {

    // THEN redirect to the new companies page
    // Remember POST/PUT/PATCH/DELETE routes should not render or send anything
    res.redirect(`/users/${savedUser._id}`)
  })
})


// SHOW
// GET
router.get('/:id', (req, res) => {

  // Find a single company
  User.findById(req.params.id).then((user) => {

    // THEN render that into a handlebars view and pass the company from our db into hbs
    res.render('user/show', {
      user: user
    })
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

  // Find a single company using the route params above
  User.findById(req.params.id).then((user) => {

    // THEN render that and id into a handlebars view and pass the company from our db into hbs
    res.render('user/edit', {
      id: req.params.id,
      user: user
    })
  })
})

// UPDATE
// PUT/PATCH
router.patch('/:id', (req, res) => {

  // Use the route params and form data to update the Company
  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    location: req.body.location

    // Make sure you add thie { new: true } flag, else your data may not refresh right away
  }, { new: true }).then((updatedUser) => {

    // Redirect to the show page once it successfully updates
    res.redirect(`/users/${updatedUser._id}`)
  })
})

// DESTROY
// DELETE
router.delete('/:id', (req, res) => {

  // Use the params id to find and remove the Company
  User.findByIdAndRemove(req.params.id).then(() => {
    res.redirect(`/users`)
  })
})


module.exports = router
