import { useState, useContext } from 'react'
import AttendeeContainer from '@/components/AttendeeContainer'
import { UserContext } from '@/context/UserContext'

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const [attendees, setAttendees] = useState([
    {
      id: 1,
      owner: 'Maggie',
      pets: [
        {
          id: 1,
          name: 'Macine',
          breed: 'Terrior Mixed',
          Age: 6,
        },
        {
          id: 2,
          name: 'Tar',
          breed: 'Wiener Dog',
          age: 1,
        },
      ],
      duration: 14,
    },
    {
      id: 2,
      owner: 'K M',
      pets: [
        {
          id: 3,
          name: 'Lucy',
          breed: 'Mixed',
          age: 8,
        },
      ],
      duration: 23,
    },
  ])

  const handleCheckIn = () => {
    setCurrentUser({ ...currentUser, atPark: true })
    setAttendees((prevAttendees) => [
      ...prevAttendees,
      { ...currentUser, duration: 10 },
    ])
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>My blank Park</h1>
        <p>5 people are currently here</p>
      </div>
      <AttendeeContainer attendees={attendees} />
      <button className='primary' onClick={handleCheckIn}>
        {currentUser.atPark ? 'Check out!' : 'Check in!'}
      </button>
    </>
  )
}
export default Home
