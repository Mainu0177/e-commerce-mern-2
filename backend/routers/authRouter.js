const { handleSignUp } = require('../controllers/authController');

const authRouter = require('express').Router();


authRouter.post('/sign-up', handleSignUp );

module.exports = authRouter;