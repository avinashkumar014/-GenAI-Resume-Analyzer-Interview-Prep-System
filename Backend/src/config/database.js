const mongoose = require("mongoose")



async function connectToDB() {

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })

        console.log("Connected to Database")
    }
    catch (err) {
        console.error("Database connection error:", err.message)
        throw err
    }
}

module.exports = connectToDB