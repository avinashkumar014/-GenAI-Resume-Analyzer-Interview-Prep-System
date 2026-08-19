const mongoose = require("mongoose")

async function connectToDB() {
    const options = {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    }

    const connectWithUri = async (uri, name) => {
        try {
            await mongoose.connect(uri, options)
            console.log(`Connected to ${name}`)
            return true
        } catch (err) {
            console.error(`${name} connection failed:`, err.message)
            return false
        }
    }

    if (process.env.MONGO_URI) {
        const atlasConnected = await connectWithUri(process.env.MONGO_URI, "MongoDB Atlas")
        if (atlasConnected) return
    }

    const localUri = process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/interview-ai"
    const localConnected = await connectWithUri(localUri, "local MongoDB")
    if (localConnected) return

    if (process.env.USE_IN_MEMORY_DB === "true") {
        try {
            console.log('connectToDB: cwd=', process.cwd())
            console.log('connectToDB: require.resolve(mongodb-memory-server)=', require.resolve('mongodb-memory-server'))
            const { MongoMemoryServer } = require('mongodb-memory-server')
            const mongod = await MongoMemoryServer.create()
            const uri = mongod.getUri()
            const memoryConnected = await connectWithUri(uri, "in-memory MongoDB")
            if (memoryConnected) return
        } catch (err) {
            console.error("In-memory MongoDB failed:", err.message || err)
        }
    } else {
        console.warn("USE_IN_MEMORY_DB is not enabled. Skipping in-memory MongoDB fallback.")
    }

    console.warn("No MongoDB connection established. The server will continue running without a database.")
}

module.exports = connectToDB