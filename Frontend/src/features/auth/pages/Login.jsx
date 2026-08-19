import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ identifier, setIdentifier ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleLogin({ identifier, password })
        if (success) {
            navigate('/')
        }
    }

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }

    return (
        <main className="auth-main">
            <div className="auth-card">
                <section className="left-panel">
                    <h1 className="title">Login</h1>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label htmlFor="identifier">Username</label>
                            <input
                                onChange={(e) => { setIdentifier(e.target.value) }}
                                type="text" id="identifier" name='identifier' placeholder='Username or email' />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" id="password" name='password' placeholder='Password' />
                        </div>

                        <button className='btn-login' type="submit">Login</button>
                    </form>
                    <p className="signup-link">Don't have an account? <Link to={'/register'}>Sign Up</Link></p>
                </section>

                <aside className="right-panel">
                    <h2>WELCOME BACK!</h2>
                    <p>We are happy to have you with us again. If you need anything, we are here to help.</p>
                </aside>
            </div>
        </main>
    )
}

export default Login