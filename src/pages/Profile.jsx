import { signOut, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase'
import { useContext } from 'react'
import { UserContext } from '@/context/UserContext'

const Profile = () => {
  const { userInfo } = useContext(UserContext)

  const handleSignOut = () => {
    console.log('sign out')
    signOut(auth)
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>My Profile</h1>
        <p>{userInfo.name}</p>
        <img src='' alt='avatar' />
        <p>Edit Profile</p>
      </div>
      <ul className='dog-container'>
        {userInfo.dogs.map((dog, index) => (
          <div key={index} className='dog-info'>
            <p>{dog.name}</p>
            <p>{dog.breed}</p>
            <p>{dog.age} years old</p>
            <p>{dog.sex}</p>
          </div>
        ))}
      </ul>
      <button className='btn-secondary' onClick={handleSignOut}>
        Sign Out
      </button>
    </>
  )
}
export default Profile
