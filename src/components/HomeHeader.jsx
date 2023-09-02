import { useContext } from 'react'
import { UserContext } from '@/context/UserContext'
import './styles/homeHeader.scss'
const HomeHeader = ({ checkedInPark }) => {
  const { userInfo } = useContext(UserContext)

  return (
    <>
      <div className='home-header'>
        {userInfo.checkedIn ? (
          <p className='warning'>
            You're currently checked in at {checkedInPark}
          </p>
        ) : null}
        <h3>Select a park to see who's there!</h3>
      </div>
    </>
  )
}
export default HomeHeader
