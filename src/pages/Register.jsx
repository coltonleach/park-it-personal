import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UndrawRegister from '@/assets/UndrawRegister'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase'

const Register = () => {
  const navigate = useNavigate()
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const name = nameRef.current.value

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user.user, { displayName: name })
      navigate('/setup')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <h1>Create your account</h1>
      <UndrawRegister />
      <form>
        <input type='text' id='name' placeholder='your name' ref={nameRef} />
        <input type='text' id='email' placeholder='email' ref={emailRef} />
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
