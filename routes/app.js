const express = require('express');
const router = express.Router();

//get the main confessions from database
router.get('/confessions', function (req, res) {

    res.send({
        type: 'GET'
    });
})


//Add a new confession to the main DB
router.post('/confessions', function (req, res) {

    res.send({
        type: 'POST'
    });
})

//Edit a confession thats already been posted
router.put('/confessions/:id', function (req, res) {

    res.send({
        type: 'PUT'
    });
})

//Delete a Confession from the main DB
router.delete('/confessions/:id', function (req, res) {

    res.send({type: 'DELETE'});
    })









    module.exports = router;