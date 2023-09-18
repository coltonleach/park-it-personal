import { useContext, useState } from 'react'
import { UserContext } from '@/context/UserContext'
import DogContainer from '@/components/DogContainer'
import DogForm from '@/components/DogForm'
import Modal from '@/components/Modal'
import { deleteDog as deleteDogUtil } from '@/utils/firebaseUtils'

const Profile = () => {
  const { userInfo } = useContext(UserContext)
  const [addDog, setAddDog] = useState(false)
  const [editDog, setEditDog] = useState(false)
  const [deleteDog, setDeleteDog] = useState(false)
  const [selectedDog, setSelectedDog] = useState({})

  const handleEditDog = (dog) => {
    setSelectedDog(dog)
    setEditDog(true)
  }

  const handleDeleteDog = (dog) => {
    setSelectedDog(dog)
    setDeleteDog(true)
  }

  const handleConfirmDelete = async () => {
    await deleteDogUtil(selectedDog?.id, userInfo.id)
    setDeleteDog(false)
    setSelectedDog({})
  }

  const handleCancelDelete = () => {
    setDeleteDog(false)
    setSelectedDog({})
  }

  const handleAddDog = () => {
    setAddDog(true)
  }

  return (
    <>
      {addDog ? (
        <Modal setShowModal={setAddDog}>
          <DogForm />
        </Modal>
      ) : null}
      {editDog ? (
        <Modal setShowModal={setEditDog}>
          <DogForm selectedDog={selectedDog} />
        </Modal>
      ) : null}
      {deleteDog ? (
        <Modal setShowModal={setDeleteDog}>
          <p style={{ fontSize: '1.1rem', textAlign: 'center' }}>
            Are you sure you want to remove{' '}
            <span style={{ fontWeight: '700' }}>{selectedDog.name}</span> from
            your account?
          </p>
          <button className='btn-secondary' onClick={handleConfirmDelete}>
            Confirm Deletion
          </button>
          <button className='btn-primary' onClick={handleCancelDelete}>
            Cancel
          </button>
        </Modal>
      ) : null}
      <div style={{ textAlign: 'center' }}>
        <h1>My Profile</h1>
        <p>{userInfo.name}</p>
      </div>
      <ul className='dog-container'>
        {userInfo.name ? (
          <DogContainer
            dogs={userInfo.dogs}
            handleEditDog={handleEditDog}
            handleDeleteDog={handleDeleteDog}
          />
        ) : null}
      </ul>
      <div className='btn-container'>
        <p style={{ fontStyle: 'italic' }}>
          you might need to refresh to see the changes
        </p>
        {/* <button className='btn-secondary'>Edit Profile</button> */}
        <button className='btn-secondary' onClick={handleAddDog}>
          Add Dog
        </button>
      </div>
    </>
  )
}
export default Profile
