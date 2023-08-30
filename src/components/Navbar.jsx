import '@/components/styles/navbar.scss'
import ParkSvg from '@/assets/ParkSvg'
import ProfileSvg from '@/assets/ProfileSvg'
import { useNavigate } from 'react-router-dom'
import { FiEdit, FiLogOut, FiUser, FiSettings } from 'react-icons/fi'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
//BsPencilSquare

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
      <FiUser size='2rem' onClick={() => navigate('/profile')} />
      <FiEdit size='2rem' onClick={() => navigate('/contact')} />
      <ParkSvg onClick={() => navigate('/')} />
      <FiLogOut size='2rem' onClick={() => signOut(auth)} />
      {/* <FiSettings size='2rem' onClick={() => navigate('/settings')} /> */}
    </div>
  )
}
export default Navbar
