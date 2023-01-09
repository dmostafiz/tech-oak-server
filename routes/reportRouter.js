var express = require('express');
const { getHeadingReports, getThirtyDaySaleReport } = require('../app/controllers/ReportController');
const authMiddleware = require('../app/middlewares/authMiddleware');
var router = express.Router();

router.get('/heading', [authMiddleware], getHeadingReports);
router.get('/sales_thirty_days', [authMiddleware], getThirtyDaySaleReport);



module.exports = router