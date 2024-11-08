const bcrypt = require('bcryptjs')


const userModel = require("../models/userModel");
const { successResponse } = require('../helpers/responseController');


const handleSignUp = async (req, res, next) =>{
    try {
        const {name, email, password} = req.body;

        if(!name){
            throw new Error('Please provide name')
        }
        if(!email){
            throw new Error('Please provide email')
        }
        if(!password){
            throw new Error('Please provide password')
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error('Something is wrong')
        }


        const userData = new userModel(req.body)
        const saveUser = await userData.save()

        return successResponse(res, {
            statusCode: 201,
            message: 'User was create successfully',
            data : saveUser,
            payload: {
                    ...req.body,
                    hashPassword
            }
        })
    } catch (error) {
        next(error)
    }
};

module.exports = {
    handleSignUp,
    
}
