const productRouter = require('express').Router();


const { getCatagoryProduct } = require('../controllers/product/getCategoryProduct');
const getCategoryWiseProduct = require('../controllers/product/getCategoryWiseProduct');
const getProductDetails = require('../controllers/product/getProductDetails');
const {uploadProduct, getAllProduct, handleUpdateProduct} = require('../controllers/product/productController');
const authToken = require('../middlewares/authToken');



// product router
productRouter.post('/upload-product', authToken, uploadProduct);
productRouter.get('/getAllProduct', authToken, getAllProduct);
productRouter.post('/updateProduct', authToken, handleUpdateProduct);

// product category router
productRouter.get('/get-categoryProduct', getCatagoryProduct);
productRouter.post('/category-product', getCategoryWiseProduct);
productRouter.post('/product-details', getProductDetails)

module.exports = productRouter