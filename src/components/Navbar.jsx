import '@/components/styles/navbar.scss'
import ParkSvg from '@/assets/ParkSvg'
import ProfileSvg from '@/assets/ProfileSvg'
import { useNavigate } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { FiUser } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
//BsPencilSquare

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
      <FiUser size='2rem' onClick={() => navigate('/profile')} />
      <ParkSvg onClick={() => navigate('/')} />
      <FiEdit size='2rem' onClick={() => navigate('/contact')} />
      {/* <FiSettings size='2rem' onClick={() => navigate('/settings')} /> */}
    </div>
  )
}
export default Navbar
