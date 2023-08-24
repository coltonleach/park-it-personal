import { useState, useContext, useEffect } from 'react'
import AttendeeContainer from '@/components/AttendeeContainer'
import { UserContext } from '@/context/UserContext'
import ParkHeader from '@/components/ParkHeader'
import { fetchAttendeesAndDogs, checkIn, checkOut } from '@/utils/utils'
import { useLoaderData, useParams } from 'react-router-dom'

const Park = () => {
  const user = useContext(UserContext)
  const { parkId } = useParams()
  const parkDetails = useLoaderData()

  const [parkName, setParkName] = useState('Big Park')
  const [attendees, setAttendees] = useState([])
  const [checkedIn, setCheckedIn] = useState(false)

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

  const handleCheckIn = async () => {
    try {
      await checkIn(user.uid, parkId)
      setCheckedIn(true)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCheckOut = async () => {
    try {
      await checkOut(user.uid)
      setCheckedIn(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <ParkHeader name={parkName} count={attendees.length} />
      <AttendeeContainer attendees={attendees} />
      <button
        className='btn-primary'
        onClick={checkedIn ? handleCheckOut : handleCheckIn}
      >
        {checkedIn ? 'Check out!' : 'Check in!'}
      </button>
    </>
  )
}
export default Park
