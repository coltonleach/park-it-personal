import {
  FiLogOut,
  FiUser,
  FiArrowRight,
  FiTrash2,
  FiMail,
} from 'react-icons/fi'
import { HiOutlineNewspaper } from 'react-icons/hi'
import './styles/settings.scss'
import { signOut, deleteUser } from 'firebase/auth'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useContext } from 'react'
import { UserContext } from '@/context/UserContext'
import Modal from '@/components/Modal'

const Settings = () => {
  const { currentUser } = useContext(UserContext)
  const [deleteAccount, setDeleteAccount] = useState(false)
  const emailRef = useRef()
  const navigator = useNavigate()

  const handleDelete = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    if (email === currentUser.email) deleteUser(currentUser)
    else console.log(`emails do not match`)
  }

  return (
    <>
      {deleteAccount ? (
        <Modal setShowModal={setDeleteAccount}>
          <form>
            <input
              type='email'
              id='email'
              placeholder='Confirm email to delete'
              ref={emailRef}
            />
          </form>
          <button className='btn-secondary' onClick={(e) => handleDelete(e)}>
            Confirm Deletion
          </button>
          <button
            className='btn-primary'
            onClick={() => setDeleteAccount(false)}
          >
            Cancel
          </button>
        </Modal>
      ) : null}
      <h1>Settings</h1>
      <ul className='settings-container'>
        <li onClick={() => navigator('/profile')}>
          <FiUser size='1.2rem' /> Account <FiArrowRight size='1.25rem' />
        </li>
        <li onClick={() => signOut(auth)}>
          <FiLogOut size='1.2rem' /> Logout <FiArrowRight size='1.25rem' />
        </li>
        <li onClick={() => setDeleteAccount(true)}>
          <FiTrash2 size='1.2rem' /> Delete account
          <FiArrowRight size='1.25rem' />
        </li>
        <li onClick={() => navigator('/devlog')}>
          <HiOutlineNewspaper size='1.2rem' /> Latest updates/bugs
          <FiArrowRight size='1.25rem' />
        </li>
        {/* <li>
          <FiMail size='1.2rem' /> Send feedback <FiArrowRight size='1.25rem' />
        </li> */}
      </ul>
    </>
  )
}
export default Settings
