var express = require('express');
const { getOwnerBusinesses, createOwnerBusinesses } = require('../app/controllers/BusinessController');
const authMiddleware = require('../app/middlewares/authMiddleware');
var router = express.Router();

router.get('/', [authMiddleware], getOwnerBusinesses);
router.post('/create', [authMiddleware], createOwnerBusinesses);

const businessRoutes = router
module.exports = businessRoutes