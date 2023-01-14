var express = require('express');
const { create, deleteUsers, getUsers } = require('../app/controllers/UserController');
const authMiddleware = require('../app/middlewares/authMiddleware');
var router = express.Router();


router.post('/create', [authMiddleware], create)
router.get('/get', [authMiddleware], getUsers)
router.post('/delete', [authMiddleware], deleteUsers)

const userRoutes = router
module.exports = userRoutes