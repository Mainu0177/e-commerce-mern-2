const addToCartModel = require("../../models/cartProduct");


const deleteAddToCartProduct = async (req, res) =>{
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req?.body?._id

        const deleteProduct = await addToCartModel.deleteOne({_id : addToCartProductId},{
            userId : currentUserId
        })

        res.json({
            data : deleteProduct,
            message : "Product delete from cart",
            error : false,
            success : true,
        })
    } catch (error) {
        res.json({
            message : error?.message || message,
            error : true,
            success : false,
        })
    }
}

module.exports = deleteAddToCartProduct;