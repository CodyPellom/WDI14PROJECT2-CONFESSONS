var express = require('express');
var router = express.Router();

//Home Page Route
router.get('/', function (req, res) {
    res.send('Confessions Home');
})

