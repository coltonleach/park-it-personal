import '@/components/styles/navbar.scss'
import ParkSvg from '@/assets/ParkSvg'
import ProfileSvg from '@/assets/ProfileSvg'
import SettingsSvg from '@/assets/SettingsSvg'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
      <ProfileSvg onClick={() => navigate('/Profile')} />
      <ParkSvg onClick={() => navigate('/')} />
      <SettingsSvg onClick={() => navigate('/Settings')} />
    </div>
  )
}
export default Navbar
