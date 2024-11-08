const app = require("./app");
const connectDatabase = require("./configs/db");
const { serverPort } = require("./configs/secret");




app.listen(serverPort, async () =>{
    console.log(`Server is running at http://localhost:${serverPort}`)
    await connectDatabase();
})