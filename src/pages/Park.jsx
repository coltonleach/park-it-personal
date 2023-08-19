import { useState, useContext, useEffect } from 'react'
import AttendeeContainer from '@/components/AttendeeContainer'
import { UserContext } from '@/context/UserContext'
import ParkHeader from '@/components/ParkHeader'
import { fetchAttendeesAndDogs } from '@/utils/utils'
import { useLoaderData, useParams } from 'react-router-dom'

const Park = () => {
  const user = useContext(UserContext)
  const { parkId } = useParams()
  const parkDetails = useLoaderData()

  const [parkName, setParkName] = useState('Big Park')
  const [attendees, setAttendees] = useState([])

  useEffect(() => {
    const updateAttendees = async () => {
      const attendeeDocs = await fetchAttendeesAndDogs(parkId)
      setParkName(parkDetails.name)
      setAttendees(
        attendeeDocs.map((user, index) => {
          return {
            ...user,
            id: index,
          }
        })
      )
    }

    updateAttendees()
  }, [])

  const handleCheckIn = () => {
    console.log('checkin')
    console.log(user)
  }

  return (
    <>
      <ParkHeader name={parkName} count={attendees.length} />
      <AttendeeContainer attendees={attendees} />
      <button className='btn-primary' onClick={handleCheckIn}>
        Check in!
      </button>
    </>
  )
}
export default Park
