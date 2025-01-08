
const addToCartModel = require("../../models/cartProduct")



const updateAddToCartProduct = async (req, res) =>{
    try {
        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({ _id : addToCartProductId },{
            userId : currentUserId,
            ...(qty && {quantity : qty})
        })

        req.json({
            message : "product added",
            data : updateProduct,
            error : false,
            success : true,
        })


    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
}

module.exports = updateAddToCartProduct;