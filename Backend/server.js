require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

async function start() {
    // Attempt to connect to the database, but allow the server to
    // start even if the DB connection fails (useful for local dev).
    try {
        await connectToDB()
    } catch (err) {
        console.error("Database connection failed, continuing without DB:", err.message)
    }

    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

start()