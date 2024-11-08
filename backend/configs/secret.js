require('dotenv').config();

// server port
const serverPort = process.env.SERVER_PORT || 4002

// database connection 
const mongoDbUrl = process.env.MONGO_DB_URL || "mongodb://localhost:27017/e-commerce-2"



module.exports = {
    serverPort,
    mongoDbUrl,
    
}