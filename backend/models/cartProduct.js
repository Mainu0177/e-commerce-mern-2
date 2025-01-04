const mongoose = require('mongoose');

const addToCart = mongoose.Schema({
    productId : String,
    quantity : Number,
    userId : String,

},{timestapms : true})

const addToCartModel = mongoose.model("addToCart", addToCart)

module.exports = addToCartModel

