const productRouter = require('express').Router();


const uploadProduct = require('../controllers/productController');
const authToken = require('../middlewares/authToken');




productRouter.post('/upload-product', authToken, uploadProduct)

module.exports = productRouter