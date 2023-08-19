import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const WithNav = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  )
}
export default WithNav
