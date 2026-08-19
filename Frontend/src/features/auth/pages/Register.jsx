import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleRegister({ username, email, password })
        if (success) navigate('/')
    }

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }

    return (
        <main className="auth-main">
            <div className="auth-card register large">
                <section className="left-panel form-area">
                    <h1 className="title">Hello!</h1>
                    <p className="subtitle">Create your account</p>

                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="input-group pill">
                            <input
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text" id="username" name='username' placeholder='Username' />
                        </div>

                        <div className="input-group pill">
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" id="email" name='email' placeholder='Email' />
                        </div>

                        <div className="input-group pill">
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" id="password" name='password' placeholder='Password' />
                        </div>

                        <div className="form-row">
                            <button className='btn-register primary' type="submit">Create Account</button>
                        </div>

                        <p className="signup-link">Already have an account? <Link to={'/login'}><strong>Login</strong></Link></p>
                    </form>
                </section>

                <aside className="right-panel hero">
                    <h2>Welcome Back!</h2>
                    <p>Simply create your account by clicking the signup button.</p>
                </aside>
            </div>
        </main>
    )
}

export default Register