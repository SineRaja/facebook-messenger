import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import loginImage from '../images//login.png'
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../AuthContext'
import { Button, FormControl, TextField } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setTimeActive } = useAuthValue()
  const navigate = useNavigate()

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true)
              navigate('/verify-email')
            })
            .catch(err => alert(err.message))
        } else {
          navigate('/')
        }
      })
      .catch(err => setError(err.message))
  }

  return (
    <div className='login_container'>
      <div className='auth_one'>
        <h1 className='login_header_style'>Software Measurement and Quality Assurance <span className='span_design'>Group Chat</span></h1>
        <img src={loginImage} className="login-image-design" alt="logo" />
      </div>
      <div className='auth_two'>
        <div className='logindeisgn'>
          <div className='form'>
            <h1 className='login_header_style'>Log in</h1>
            {error && <div className='auth__error'>{error}</div>}
            <form onSubmit={login} name='login_form'>
              <FormControl>
                <TextField fullWidth
                  helperText="Please enter your email id"
                  type='email'
                  id = 'username'
                  value={email}
                  label="Email Id"
                  onChange={e => setEmail(e.target.value)} />

                <TextField fullWidth
                  helperText="Please enter your password"
                  type='password'
                  id= 'password'
                  value={password}
                  label='Password'
                  onChange={e => setPassword(e.target.value)} />

                <Button type='submit' variant="contained" endIcon={<LoginIcon />}>
                  Login
                </Button>
                {/* <button type='submit'>Login</button> */}
              </FormControl>
            </form>
            <p className='description_design'>
              Don't have and account?
              <Link to='/register'>Create one here</Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login