import { useContext, useState } from 'react'
import { UserContext } from '@/context/UserContext'
import DogContainer from '@/components/DogContainer'
import DogForm from '@/components/DogForm'
import Modal from '@/components/Modal'

const Profile = () => {
  const { userInfo } = useContext(UserContext)
  const [addDog, setAddDog] = useState(false)

  const handleEditDog = (id) => {
    setAddDog(true)
  }

  const handleAddDog = () => {
    setAddDog(true)
  }

  return (
    <>
      {addDog ? (
        <Modal setShowModal={setAddDog}>
          <DogForm setEditDog={setAddDog} />
        </Modal>
      ) : null}
      <div style={{ textAlign: 'center' }}>
        <h1>My Profile</h1>
        <p>{userInfo.name}</p>
      </div>
      <ul className='dog-container'>
        {userInfo.name ? (
          <DogContainer dogs={userInfo.dogs} setEditDog={setAddDog} />
        ) : null}
      </ul>
      <div className='btn-container'>
        <p style={{ fontStyle: 'italic' }}>editing feature coming soon</p>
        {/* <button className='btn-secondary'>Edit Profile</button> */}
        <button className='btn-secondary' onClick={handleAddDog}>
          Add Dog
        </button>
      </div>
    </>
  )
}
export default Profile
