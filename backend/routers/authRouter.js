const authRouter = require('express').Router();

const {
    handleSignUp,
    handleSignIn,
    handleUserDetails,
    handleUserLogOut,
    handleAllUser,
    handleUpdateUser,
    } = require('../controllers/authController');
const authToken = require('../middlewares/authToken');



authRouter.post('/sign-up', handleSignUp );
authRouter.post('/sign-in', handleSignIn);
authRouter.get('/user-details', authToken, handleUserDetails);
authRouter.get('/user-Logout', handleUserLogOut);

// admin panel
authRouter.get('/all-users', authToken, handleAllUser);
authRouter.post('/update-user', authToken, handleUpdateUser)

module.exports = authRouter;