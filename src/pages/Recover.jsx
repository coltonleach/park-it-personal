import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRef, useState } from 'react'
import UndrawResetPassword from '@/assets/UndrawResetPassword'
import Notification from '@/components/Notification'
import { resetNotification } from '@/utils/utils'
import { Link } from 'react-router-dom'

const Recover = () => {
  const [notification, setNotification] = useState({ text: null, type: null })
  const emailRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value

    try {
      const res = await sendPasswordResetEmail(auth, email)
      setNotification({ text: 'Recovery email sent!', type: 'success' })
      resetNotification(setNotification)
    } catch (err) {
      console.error(err)
      setNotification({ text: err.code, type: 'error' })
      resetNotification(setNotification)
    }
  }

  return (
    <>
      {notification.type ? (
        <Notification text={notification.text} type={notification.type} />
      ) : null}
      <h1>Reset Password</h1>
      <UndrawResetPassword />
      <form onSubmit={handleSubmit}>
        <input type='text' id='email' placeholder='email' ref={emailRef} />
        <button className='btn-primary'>Send email</button>
      </form>
      <Link className='btn-secondary' to='/'>
        Back
      </Link>
    </>
  )
}
export default Recover
