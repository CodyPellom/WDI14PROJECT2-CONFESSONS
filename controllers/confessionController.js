
const express = require('express')
const methodOverride = require('method-override')
// IMPORTANT: make sure to add merge params
const router = express.Router({ mergeParams: true })


const User = require('../models/user')
const Confession = require('../models/confession')

/* GET home page. */
router.get('/', (req, res) => {

  Confession.find().then((confessions) => {
    res.render('confessions/index', {
      confessions: confessions
    })
  })

})

// NEW
// GET
router.get('/new', (req, res) => {


  res.render('confessions/new')
})

// CREATE
// POST
router.post('/', (req, res) => {





  const newConfession = new Confession({
    name: req.body.name,
    submit: req.body.submit

  })


  newConfession.save()
    .then((savedConfession) => {

      // Redirect to all sodas
      res.redirect(`/confessions`)
    })
})
//findconfessionbyID is te way james suggested to implement CRUD, specifically Edit and Delete.
//router.delete etc, is not needed and is making the cde overyl complex

// SHOW
router.get('/:id', (req, res) => {


  Confession.findById(req.params.id).then((confession) => {


    res.render('confessions/show', {
      confession: confession,
      id: req.params.id
    })
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

  Confession.findById(req.params.id).then((confession) => {
    res.render('confessions/edit', {
      id: req.params.id
    })
  })
})

// UPDATE
// PUT/PATCH
router.patch('/:id', (req, res) => {
  User.findById(req.params.userId).then((user) => {


   // const confession = user.confessions.id(req.params.id)
   // confession.name = req.body.name
   // confession.submit = req.body.submit

    Confession.findByIdAndUpdate(req.params.id).then(confession => {
      res.redirect('/confessions')
    })
    


    return user.save()
  }).then((updatedUser) => {
    res.redirect(`/users/${updatedUser._id}/confessions/${req.params.id}`)
  })
})

// DESTROY
// DELETE
router.delete('/:id', (req, res) => {


  Confession.findByIdAndRemove(req.params.id).then(() => {
    res.redirect('/confessions')
  })
})


module.exports = router
