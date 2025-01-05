const { model } = require("mongoose")
const addToCartModel = require("../../models/cartProduct")



const updateAddToCartProduct = async (req, res) =>{
    try {
        const currenUserId = req.userId
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({ _id : addToCartProductId },{
            userId : currenUserId,
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

model.export = updateAddToCartProduct;