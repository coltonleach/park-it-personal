import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UndrawSignin from '@/assets/UndrawSignin'
import Notification from '@/components/Notification'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { resetNotification } from '@/utils/utils'

const Login = () => {
  const [notification, setNotification] = useState({ text: null, type: null })
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value

    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      console.log(err)
      setNotification({ text: err.code, type: 'error' })
      resetNotification(setNotification)
    }
  }

  return (
    <>
      {notification.type ? (
        <Notification text={notification.text} type={notification.type} />
      ) : null}
      <h1>Welcome Back!</h1>
      <UndrawSignin />
      <form>
        <input type='text' id='email' placeholder='email' ref={emailRef} />
        <input
          type='password'
          id='password'
          placeholder='password'
          ref={passwordRef}
        />
      </form>
      <div className='btn-container'>
        <button className='btn-primary' onClick={handleSubmit}>
          Sign in
        </button>
        <Link to='/register' className='btn-secondary'>
          Create an account
        </Link>
      </div>
      <Link to='/recover'>Forgot password?</Link>
    </>
  )
}

export default Login
