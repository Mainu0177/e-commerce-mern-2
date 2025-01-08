
const stripe = require('../../configs/stripe')
const userModel = require('../../models/userModel')


const paymentController = async (req, res) =>{
    try {
        const { cartItems } = req.body;

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
            customar_email : user.email,
            line_items : cartItems.map((item,index) =>{
                return{
                    price_data : {
                        product_data :{
                            
                        }
                    }
                }
            })
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
