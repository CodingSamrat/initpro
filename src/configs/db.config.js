import Mongoose from "mongoose";



// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : db.config.js
// Description  : MongoDb Connection
// =================================================================================



const databaseConfig = async () => {
    try {
        const connect = Mongoose.connect(process.env.MONGODB)
        console.log("✓  MongoDB connected to <", (await connect).connection.name, ">", !(await connect).connection.host.includes('aay2quz') ? "local" : "")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


export {
    databaseConfig
}