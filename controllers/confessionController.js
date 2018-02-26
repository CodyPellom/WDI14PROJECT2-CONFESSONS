const express = require('express')

// IMPORTANT: make sure to add merge params
const router = express.Router({ mergeParams: true })


const User = require('../models/user')
const Confession = require('../models/confession')

/* GET home page. */
router.get('/', (req, res) => {

  // Find the company by route params defined in app.js
  User.findById(req.params.userId).then((user) => {

    
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


  res.render('confessions/new', {
    userId: req.params.userId
  })
})

// CREATE
// POST
router.post('/', (req, res) => {


  User.findById(req.params.userId).then((user) => {


    const newConfession = new Confession({
      name: req.body.name,
      price: req.body.price
      
    })

    user.confessions.push(newConfession)

    return user.save()
  }).then((updatedUser) => {

    // Redirect to all sodas
    res.redirect(`/users/${req.params.userId}/confessions`)
  })
})


// SHOW
router.get('/:id', (req, res) => {

  
  User.findById(req.params.userId).then((user) => {

    const confession = user.confessions.id(req.params.id)

  
    res.render('confession/show', {
      userId: req.params.userId,
      confession: confession
    })
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

 
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

    
    const confession = user.confessions.id(req.params.id)
    confession.name = req.body.name
    confession.price = req.body.price
 

    
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
