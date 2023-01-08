var express = require('express');
const { getHeadingReports } = require('../app/controllers/ReportController');
const authMiddleware = require('../app/middlewares/authMiddleware');
var router = express.Router();

router.get('/heading', [authMiddleware], getHeadingReports);

router.get('/ok', function (req, res) {
    res.render('index', { title: 'Fullstack App' });
});



module.exports = router