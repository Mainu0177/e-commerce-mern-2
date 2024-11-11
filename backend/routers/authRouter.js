const { handleSignUp, handleSignIn } = require('../controllers/authController');

const authRouter = require('express').Router();


authRouter.post('/sign-up', handleSignUp );
authRouter.post('/sign-in', handleSignIn);

module.exports = authRouter;