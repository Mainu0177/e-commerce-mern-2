const productRouter = require('express').Router();


const paymentController = require('../controllers/order/paymentcontroller');
const filterProductController = require('../controllers/product/filterProduct');
const { getCatagoryProduct } = require('../controllers/product/getCategoryProduct');
const getCategoryWiseProduct = require('../controllers/product/getCategoryWiseProduct');
const getProductDetails = require('../controllers/product/getProductDetails');
const {getAllProduct, handleUpdateProduct} = require('../controllers/product/productController');
const searchProduct = require('../controllers/product/searchProduct');
const uploadProduct = require('../controllers/product/uploadProduct');
const addToCartController = require('../controllers/user/addToCartController');
const addToCartViewProduct = require('../controllers/user/addToCartViewProduct');
const deleteAddToCartProduct = require('../controllers/user/deleteAddToCartProduct');
const productCountController = require('../controllers/user/productCountController');
const updateAddToCartProduct = require('../controllers/user/updateAddToCartProduct')
const authToken = require('../middlewares/authToken');



// product router
productRouter.post('/upload-product', authToken, uploadProduct);
productRouter.get('/getAllProduct', authToken, getAllProduct);
productRouter.post('/updateProduct', authToken, handleUpdateProduct);

// product category router
productRouter.get('/get-categoryProduct', getCatagoryProduct);
productRouter.post('/category-product', getCategoryWiseProduct);
productRouter.post('/product-details', getProductDetails);
productRouter.get('/searchProduct', searchProduct);
productRouter.post('/filter-product', filterProductController);

// user add to cart
productRouter.post('/addtocart',authToken, addToCartController);
productRouter.get('/productCount', authToken, productCountController);
productRouter.get('/view-cart-product', authToken, addToCartViewProduct);
productRouter.post('/update-cart-product', authToken, updateAddToCartProduct);
productRouter.post('/delete-cart-product', authToken, deleteAddToCartProduct);

// payment and order
productRouter.post('/checkout', authToken, paymentController)

module.exports = productRouter