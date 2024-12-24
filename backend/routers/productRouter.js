const productRouter = require('express').Router();


const {uploadProduct, getAllProduct, handleUpdateProduct} = require('../controllers/productController');
const authToken = require('../middlewares/authToken');




productRouter.post('/upload-product', authToken, uploadProduct);
productRouter.get('/getAllProduct', authToken, getAllProduct);
productRouter.post('/updateProduct', authToken, handleUpdateProduct);

module.exports = productRouter