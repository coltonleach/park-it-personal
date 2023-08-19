import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const WithoutNav = () => {
  return (
    <>
      <Outlet />
    </>
  )
}
export default WithoutNav
