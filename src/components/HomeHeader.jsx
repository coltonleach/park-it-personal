import { useContext } from 'react'
import { UserContext } from '@/context/UserContext'
import './styles/homeHeader.scss'
const HomeHeader = ({ checkedInPark }) => {
  const { userInfo } = useContext(UserContext)

  return (
    <>
      <div className='home-header'>
        <h1>Welcome back, {userInfo.name}!</h1>
        {userInfo.checkedIn ? (
          <p className='warning'>
            You're currently checked in at {checkedInPark}
          </p>
        ) : null}
      </div>
    </>
  )
}
export default HomeHeader
