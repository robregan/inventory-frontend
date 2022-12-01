import styles from './auth.module.scss'
import { BiLogIn } from 'react-icons/bi'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { loginUser, validateEmail } from '../../services/authService'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const { email, password } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const login = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      return toast.error('Please fill in all fields')
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email..')
    }

    const userData = {
      email,
      password,
    }

    setIsLoading(true)
    try {
      const data = await loginUser(userData)
      console.log(data)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate('/dashboard')
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <BiLogIn size={35} color='#999' />
          </div>
          <h2>Login</h2>

          <form onSubmit={login}>
            <input
              type='email'
              value={email}
              onChange={handleInputChange}
              placeholder='Email'
              required
              name='email'
            />
            <input
              type='password'
              placeholder='Password'
              required
              name='password'
              value={password}
              onChange={handleInputChange}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Login
            </button>
          </form>

          <Link to='/forgot'>Forgot Password </Link>
          <br></br>

          <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p>&nbsp; Don't have an account? &nbsp;</p>
            <Link to='/register'>Register</Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Login
