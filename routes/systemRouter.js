var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { title: 'Express updated' });
});

router.get('/ok', function (req, res) {
    res.render('index', { title: 'Fullstack App' });
});



module.exports = router