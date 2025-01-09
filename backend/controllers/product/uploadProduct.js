
const uploadProductPermission = require('../../helpers/permission')
const productModel = require('../../models/productModel')

const uploadProducts = async (req, res) =>{
    try {
        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        console.log("product", req.body)
        res.status(201).json({
            data : saveProduct,
            message : "Product upload successfully",
            success : true,
            error : false,
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
}

module.exports = uploadProducts;