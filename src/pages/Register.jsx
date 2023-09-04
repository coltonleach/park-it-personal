import { useRef, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UndrawRegister from '@/assets/UndrawRegister'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase'
import Notification from '@/components/Notification'
import { resetNotification } from '@/utils/utils'
import { addUser } from '@/utils/firebaseUtils'
import { UserContext } from '@/context/UserContext'

const Register = () => {
  const { currentUser } = useContext(UserContext)

  const [notification, setNotification] = useState({ text: null, type: null })

  const navigate = useNavigate()
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = nameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const confirmPassword = confirmPasswordRef.current.value

    if (password === confirmPassword) {
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(user.user, { displayName: name })
        await addUser(name, user.user.uid)
        navigate('/setup')
      } catch (err) {
        console.log(err)
        setNotification({ text: err.code, type: 'error' })
        resetNotification(setNotification)
      }
    } else {
      setNotification({ text: 'Passwords do not match!', type: 'error' })
      resetNotification(setNotification)
    }
  }

  return (
    <>
      {notification.type ? (
        <Notification text={notification.text} type={notification.type} />
      ) : null}
      <h1>Create your account</h1>
      <UndrawRegister />
      <form>
        <input type='text' id='name' placeholder='your name' ref={nameRef} />
        <input type='email' id='email' placeholder='email' ref={emailRef} />
        <input
          type='password'
          id='password'
          placeholder='password'
          ref={passwordRef}
        />
        <input
          type='password'
          id='confirmPassword'
          placeholder='confirm password'
          ref={confirmPasswordRef}
        />
      </form>
      <div className='btn-container'>
        <button className='btn-primary' onClick={handleSubmit}>
          Create Account
        </button>
        <Link to='/login' className='btn-secondary'>
          Already have an account?
        </Link>
      </div>
      <Link to='/recover'>Forgot password?</Link>
    </>
  )
}
export default Register
