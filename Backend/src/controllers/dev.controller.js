const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getCookieOptions } = require('../utils/cookieOptions')

async function devLogin(req, res) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ message: 'Not allowed in production' })
    }

    const email = process.env.DEV_USER_EMAIL || 'dev@local'
    const username = process.env.DEV_USER_NAME || 'dev'
    const password = process.env.DEV_USER_PASSWORD || 'password'

    let user = await userModel.findOne({ email })
    if (!user) {
        const hash = await bcrypt.hash(password, 10)
        user = await userModel.create({ username, email, password: hash })
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie('token', token, getCookieOptions())
    return res.status(200).json({ message: 'Dev user logged in', user: { id: user._id, username: user.username, email: user.email } })
}

module.exports = { devLogin }
