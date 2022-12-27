var express = require('express');
const { create, deleteProduct, getProducts } = require('../app/controllers/ProductController');
const authMiddleware = require('../app/middlewares/authMiddleware');
var router = express.Router();


router.post('/create', [authMiddleware], create)
router.get('/get', [authMiddleware], getProducts)
router.post('/delete', [authMiddleware], deleteProduct)

const productRoutes = router
module.exports = productRoutes