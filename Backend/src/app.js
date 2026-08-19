const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

// Development-only debug route to inspect critical env vars
app.get('/__debug_env', (req, res) => {
    res.json({
        JWT_SECRET_present: !!process.env.JWT_SECRET,
        JWT_SECRET: process.env.JWT_SECRET ? process.env.JWT_SECRET.replace(/.(?=.{4})/g, '*') : null
    })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((err, req, res, next) => {
    console.error("Unhandled API error:", err)

    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Resume must be smaller than 3MB." })
    }

    if (err.name === "MulterError") {
        return res.status(400).json({ message: err.message })
    }

    return res.status(500).json({ message: "Unexpected server error." })
})



module.exports = app