import { signOut, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase'
import { useContext } from 'react'
import { UserContext } from '@/context/UserContext'

const Profile = () => {
  const user = useContext(UserContext)

  const handleSignOut = () => {
    console.log('sign out')
    signOut(auth)
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>My Profile</h1>
        <p>{user.displayName}</p>
        <img src='' alt='avatar' />
        <p>Edit Profile</p>
      </div>
      <ul>
        {/* <li>Dog Parks</li> */}
        <li>Your dogs</li>
        {/* <li>Liked dogs</li>
        <li>Disliked dogs</li> */}
      </ul>
      <button className='btn-secondary' onClick={handleSignOut}>
        Sign Out
      </button>
    </>
  )
}
export default Profile
