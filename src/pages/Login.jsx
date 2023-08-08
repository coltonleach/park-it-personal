import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import UndrawSignin from '@/assets/UndrawSignin'
import Notification from '@/components/Notification'

const Signin = () => {
  const [error, setError] = useState(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = async () => {
    console.log('login')
    // const res = await supabase.auth.signInWithPassword({
    //   email: emailRef.current?.value!,
    //   password: passwordRef.current?.value!,
    // })

    // if (!res.error) router.push('/home')
    // else {
    //   setError(res.error?.message)
    //   setTimeout(() => {
    //     setError(null)
    //   }, 5000)
    // }
  }

  return (
    <>
      {error && <Notification text={error} type='error' />}
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

export default Signin
