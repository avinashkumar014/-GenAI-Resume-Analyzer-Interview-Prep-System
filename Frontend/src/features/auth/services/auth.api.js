import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD
    ? "https://genai-resume-analyzer-interview-prep.onrender.com"
    : "http://localhost:3000")

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {
        throw err
    }

}

export async function login({ email, identifier, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email: email || identifier, password
        })

        return response.data

    } catch (err) {
        console.log(err)
        // rethrow so callers can handle and read server error messages
        throw err
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {

    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        console.log(err)
        throw err
    }

}