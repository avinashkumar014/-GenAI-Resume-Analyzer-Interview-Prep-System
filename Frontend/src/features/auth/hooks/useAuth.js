import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, identifier, password }) => {
        setLoading(true)
        let success = false
        try {
            const data = await login({ email, identifier, password })
            if (data && data.user) {
                setUser(data.user)
                success = true
            } else {
                console.error('Login did not return user', data)
            }
        } catch (err) {
            console.error(err?.response?.data?.message || err)
        } finally {
            setLoading(false)
        }
        return success
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            if (data && data.user) {
                setUser(data.user)
                return true
            }
        } catch (err) {
            console.error(err?.response?.data?.message || err)

        } finally {
            setLoading(false)
        }
        return false
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                if (data?.user) {
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            } catch (err) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}