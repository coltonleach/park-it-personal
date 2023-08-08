import { useRef } from 'react'
import { Link } from 'react-router-dom'
import UndrawRegister from '@/assets/UndrawRegister'

const Register = () => {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const handleSubmit = () => {
    console.log('submit')
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
        <Link to='/sign-in' className='btn-secondary'>
          Already have an account?
        </Link>
      </div>
      <Link to='/recover'>Forgot password?</Link>
    </>
  )
}
export default Register
