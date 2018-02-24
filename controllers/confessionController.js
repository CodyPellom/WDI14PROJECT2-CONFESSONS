const express = require('express')

// IMPORTANT: make sure to add merge params
const router = express.Router({ mergeParams: true })


const User = require('../models/user')
const Confession = require('../models/confession')

/* GET home page. */
router.get('/', (req, res) => {

  // Find the company by route params defined in app.js
  User.findById(req.params.userId).then((user) => {

    // Pass all sodas and the company to a view specifically for showing all sodas
    const confessions = user.confessions
    res.render('confession/index', {
      user: user,
      confessions: confessions
    })
  })
})

// NEW
// GET
router.get('/new', (req, res) => {

  // We only need to pass the company ID to this new view
  res.render('confessions/new', {
    userId: req.params.userId
  })
})

// CREATE
// POST
router.post('/', (req, res) => {

  // Get company we need to save soda to
  User.findById(req.params.userId).then((user) => {

    // THEN once we have the company, take req.body and make a new Soda
    const newConfession = new Confession({
      name: req.body.name,
      price: req.body.price
      
    })

    // Push Soda to company.sodas
    user.confessions.push(newConfession)

    // Save Company
    return user.save()
  }).then((updatedUser) => {

    // Redirect to all sodas
    res.redirect(`/users/${req.params.userId}/confessions`)
  })
})


// SHOW
router.get('/:id', (req, res) => {

  // Find company from companyId route param
  User.findById(req.params.userId).then((user) => {

    // Use the .id method to extract a single soda from company.sodas
    const confession = user.confessions.id(req.params.id)

    // connect it to a soda/show view
    res.render('confession/show', {
      userId: req.params.userId,
      confession: confession
    })
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

  // Make sure to take a look at the soda/edit file. It will show you a lot concerning how 
  // to connect the initial values to this edit page
  User.findById(req.params.userId).then((user) => {
    const confession = user.confessions.id(req.params.id)
    res.render('confession/edit', {
      userId: req.params.userId,
      confession: confession
    })
  })
})

// UPDATE
// PUT/PATCH
router.patch('/:id', (req, res) => {
  User.findById(req.params.userId).then((user) => {

    // We don't have a nice method like findByIdAndUpdate here
    // so instead we need to manually change the sodas values
    const confession = user.confessions.id(req.params.id)
    confession.name = req.body.name
    confession.price = req.body.price
 

    // Then Save the company
    return user.save()
  }).then((updatedUser) => {
    res.redirect(`/users/${updatedUser._id}/confessions/${req.params.id}`)
  })
})

// DESTROY
// DELETE
router.delete('/:id', (req, res) => {
  User.findById(req.params.userId).then((user) => {
    const confession = user.confessions.id(req.params.id)
    confession.remove()
    return user.save()
  }).then(() => {
    res.redirect(`/users/${req.params.userId}/confessions`)
  })
})


module.exports = router
