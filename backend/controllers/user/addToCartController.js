const addToCartModel = require("../../models/cartProduct");


const addToCartController = async (req, res) =>{
    try {
        const { productId } = req?.body;
        const currenUser = req.userId;

        const isProductAvailable = await addToCartModel.findOne({ productId })
        
        if(isProductAvailable){
            return res.json({
                message : "Already exists in Add to cart",
                success : true,
                error : false,
            })
        }
        
        const payload = {
            productId : productId,
            quantity : 1,
            userId : currenUser,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data : saveProduct,
            message : "Product added in to the Cart",
            success : true,
            error : false,
        })

    } catch (error) {
        res.json({
            message : error?.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = addToCartController;




