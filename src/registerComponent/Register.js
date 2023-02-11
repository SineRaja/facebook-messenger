import { useState } from 'react'
import '../loginComponent/Login.css'
import createaccount from '../images/createaccount.png'
import { auth } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { useAuthValue } from '../AuthContext'
import { Button, FormControl, TextField } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';

function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setTimeActive } = useAuthValue()

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e => {
    e.preventDefault()
    setError('')
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true)
              navigate('/verify-email')
            }).catch((err) => alert(err.message))
        })
        .catch(err => setError(err.message))
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className='login_container'>
      <div className='auth_one'>
        <h1 className='login_header_style'>Software Measurement and Quality Assurance <span className='span_design'>Group Chat</span></h1>
        <img src={createaccount} className="login-image-design" alt="logo" />
      </div>
      <div className='auth_two'>
        <div className='registerdeisgn'>
          <h1 className='login_header_style'>Register</h1>
          {error && <div className='auth__error'>{error}</div>}
          <form onSubmit={register} name='registration_form'>
            <FormControl>
              <TextField fullWidth
                helperText="Please enter your email id"
                type='email'
                value={email}
                placeholder="Enter your email"
                required
                onChange={e => setEmail(e.target.value)} />

              <TextField fullWidth
                helperText="Please enter your password"
                type='password'
                value={password}
                required
                placeholder='Enter your password'
                onChange={e => setPassword(e.target.value)} />

              <TextField fullWidth
                helperText="Please enter your  confrim password"
                type='password'
                value={confirmPassword}
                required
                placeholder='Confirm password'
                onChange={e => setConfirmPassword(e.target.value)} />

              <Button type='submit' variant="contained" endIcon={<LogoutIcon />}> Register</Button>
            </FormControl>
          </form>
          <p className='description_design'>
            Already have an account?
            <Link to='/login'>login</Link>
          </p>

        </div>
      </div>
    </div>

  )
}

export default Register