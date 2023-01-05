var express = require('express');
const { update } = require('../app/controllers/ProfileController');
const authMiddleware = require('../app/middlewares/authMiddleware');
var router = express.Router();


router.post('/update', [authMiddleware], update)

const profileRoutes = router
module.exports = profileRoutes