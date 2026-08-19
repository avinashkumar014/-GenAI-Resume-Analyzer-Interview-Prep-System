function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production"

    return {
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        maxAge: 24 * 60 * 60 * 1000,
        path: "/"
    }
}

function clearCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production"

    return {
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        path: "/"
    }
}

module.exports = {
    getCookieOptions,
    clearCookieOptions
}
