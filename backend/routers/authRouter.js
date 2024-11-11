const { handleSignUp, handleSignIn, handleUserDetails } = require('../controllers/authController');
const authToken = require('../middlewares/authToken');

const authRouter = require('express').Router();


authRouter.post('/sign-up', handleSignUp );
authRouter.post('/sign-in', handleSignIn);
authRouter.get('/user-details', authToken, handleUserDetails)

module.exports = authRouter;