
const uploadProductPermission = require('../../helpers/permission')
const productModel = require('../../models/productModel')


// const uploadProduct = async (req, res) =>{
//     try {
//         const sessionUserId = req.userId

//         if(!uploadProductPermission(sessionUserId)){
//             throw new Error("Permission denied")
//         }

//         const uploadProduct = new productModel(req.body)
//         const saveProduct = await uploadProduct.save()

//         console.log("product", req.body)
//         res.status(201).json({
//             data : saveProduct,
//             message : "Product upload successfully",
//             success : true,
//             error : false,
//         })
//     } catch (error) {
//         res.status(400).json({
//             message : error.message || error,
//             error : true,
//             success : false,
//         })
//     }
// }

const handleUpdateProduct = async (req, res, next) =>{
    try{
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }
        const { _id, ...resBody} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)
        res.josn({
            message : "Product update successfully",
            data : updateProduct,
            success : true,
            error : false,
        })
    }catch(error){
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

const getAllProduct = async (req, res, next) =>{
    try {
        const allProduct = await productModel.find().sort({ createdAt : -1 })

        res.json({
            message: "All Products",
            success: true,
            error: false,
            data : allProduct,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = {
    // uploadProduct,
    getAllProduct,
    handleUpdateProduct
};