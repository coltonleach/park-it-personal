import '@/components/styles/navbar.scss'
import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiUser, FiHome } from 'react-icons/fi'
import { signOut } from 'firebase/auth'
import { TbMessage } from 'react-icons/tb'
import { auth } from '@/firebase'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
      <FiUser size='2rem' onClick={() => navigate('/profile')} />
      <TbMessage size='2rem' onClick={() => navigate('/contact')} />
      <FiHome size='2rem' onClick={() => navigate('/')} />
      <FiLogOut size='2rem' onClick={() => signOut(auth)} />
      {/* <FiSettings size='2rem' onClick={() => navigate('/settings')} /> */}
    </div>
  )
}
export default Navbar
