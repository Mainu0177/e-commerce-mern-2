const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
const { errorResponse } = require('./helpers/responseController');
const authRouter = require('./routers/authRouter');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// auth router
app.use('/api/auth', authRouter)




// client error handling
app.use((req, res, next) =>{
    next(createError(404, 'Route not found'))
});

// server error handling 
app.use((err, req, res, next) =>{
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message,
    })
})

module.exports = app;