import '@/components/styles/navbar.scss'
import { useNavigate } from 'react-router-dom'
import { FiSettings, FiHome } from 'react-icons/fi'
import { TbMessage } from 'react-icons/tb'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
      <FiSettings size='2rem' onClick={() => navigate('/settings')} />
      <FiHome size='2rem' onClick={() => navigate('/')} />
      <TbMessage size='2rem' onClick={() => navigate('/bulletin')} />
    </div>
  )
}
export default Navbar
