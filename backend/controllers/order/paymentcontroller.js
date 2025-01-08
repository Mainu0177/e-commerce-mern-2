
const stripe = require('../../configs/stripe')
const userModel = require('../../models/userModel')


const paymentController = async (req, res) =>{
    try {
        const { cartItems } = req.body;

        console.log("CartItems", cartItems)

        const user = await userModel.findOne({_id : req.userId})

        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card'],
            billing_address_collection : 'auto',
            shipping_options : [
                {
                    shipping_rate : 'shr_1Qf0iWI3iFGJcBu0iNw2cBGS'
                }
            ],
            customer_email : user.email,
            line_items : cartItems.map((item,index) =>{
                return{
                    price_data : {
                        product_data :{
                            name : item.productId.productName,
                            images : item.productId.productImage,
                            metadata : {
                                productId : item.productId._id
                            }
                        },
                        unit_amount : item.productId
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1
                    },
                    quantity : item.quantity
                }
            }),
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`,
        }

        const session = await stripe.checkout.session.create(params)

        Response.status(300).json(session)
    } catch (error) {
        res.json({
            message : error?.message || error,
            error : true,
            success : false,
        })
    }
}

module.exports = paymentController
