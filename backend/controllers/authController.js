const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userModel = require("../models/userModel");



const handleSignUp = async (req, res ) =>{
    try {
        const {name, email, password} = req.body;

        const user = await userModel.findOne({email})
        if(user){
            throw new Error('Already user exits')
        }

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

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }
        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error : true, 
            success: false,
        })
    }
};

const handleSignIn = async (req, res) =>{
    try {
            const { email , password} = req.body
    
            if(!email){
                throw new Error("Please provide email")
            }
            if(!password){
                throw new Error("Please provide password")
            }
    
            const user = await userModel.findOne({email})
    
            if(!user){
                throw new Error("User not found")
            }
    
            const checkPassword = await bcrypt.compare(password,user.password)
    
            console.log("checkPassoword",checkPassword)
    
            if(checkPassword){
            const tokenData = {
                _id : user._id,
                email : user.email,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
    
            const tokenOption = {
                httpOnly : true,
                secure : true
            }
    
            res.cookie("token",token,tokenOption).status(200).json({
                message : "Login successfully",
                data : token,
                success : true,
                error : false
            })
    
            }else{
            throw new Error("Please check Password")
            }

    } catch (error) {
        res.json({
            message : error.message || error  ,
            error : true,
            success : false,
        })
    }
}

const handleUserDetails = async (req, res) =>{
    try{
        console.log("userId", req.userId)
        const user = await userModel.findById(req.userId)

        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "User details"
        })

        console.log("user",user)

    }catch(error){
        res.status(400).json({
            message : err.message || error,
            error : true,
            success : false
        })
    }
}

const handleUserLogOut = async (req, res, next) =>{
    try {
        res.clearCookie("token")

        res.json({
            data : [],
            message : "Log out successfully",
            error : false,
            success : true,
            
        })
    } catch (error) {
        res.json({
            message : error.message || error  ,
            error : true,
            success : false,
        })
    }
}

const handleAllUser = async(req, res, next) =>{
    try {
        console.log('all users', req.userId);

        const allUsers = await userModel.find()
        res.json({
            message : 'all users',
            data : allUsers,
            success : true,
            error : false,
        })
    } catch (error) {
        res.json({
            message : error.message || error  ,
            error : true,
            success : false,
        })
    }
}

const handleUpdateUser = async (req, res, next) =>{
    try {
        const sessionUser = req.userId
        const {userId, email, name, role} = req.body;

        const payload = {
            ...( email && {email : email}),
            ...( name && {name : name}),
            ...( role && {role : role}),
        }

        const user = await userModel.findById(sessionUser)
        console.log("user role", user)

        const updateUser = await userModel.findByIdAndUpdate(userId, payload);

        res.json({
            data : updateUser,
            message : "User updated",
            success : true, 
            error : false,
        })
    } catch (error) {
        res.json({
            message : error.message || error  ,
            error : true,
            success : false,
        })
    }
}

module.exports = {
    handleSignUp,
    handleSignIn,
    handleUserDetails,
    handleUserLogOut,
    handleAllUser,
    handleUpdateUser
}
