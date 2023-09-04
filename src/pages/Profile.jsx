import { useContext, useState } from 'react'
import { UserContext } from '@/context/UserContext'
import DogContainer from '@/components/DogContainer'
import EditDog from '@/components/EditDog'

const Profile = () => {
  const { userInfo } = useContext(UserContext)
  const [editDog, setEditDog] = useState(false)

  const handleEditDog = (id) => {
    setEditDog(true)
  }

  const handleAddDog = () => {
    setEditDog(true)
  }

  return (
    <>
      {editDog ? <EditDog setEditDog={setEditDog} /> : null}
      <div style={{ textAlign: 'center' }}>
        <h1>My Profile</h1>
        <p>{userInfo.name}</p>
      </div>
      <ul className='dog-container'>
        {userInfo.name ? (
          <DogContainer dogs={userInfo.dogs} setEditDog={setEditDog} />
        ) : null}
      </ul>
      <div className='btn-container'>
        <p style={{ fontStyle: 'italic' }}>editing feature coming soon</p>
        {/* <button className='btn-secondary'>Edit Profile</button>
        <button className='btn-secondary' onClick={handleAddDog}>
          Add Dog
        </button> */}
      </div>
    </>
  )
}
export default Profile
