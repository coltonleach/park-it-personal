import { Outlet } from 'react-router-dom'
import { auth } from '@/firebase'
import { signOut } from 'firebase/auth'

const SetupLayout = () => {
  return (
    <>
      <Outlet />
      <button
        className='btn-tertiary'
        style={{ fontSize: '1rem', marginTop: 'auto' }}
        onClick={() => signOut(auth)}
      >
        Sign Out
      </button>
    </>
  )
}
export default SetupLayout
