import { useState, useContext, useEffect } from 'react'
import AttendeeContainer from '@/components/AttendeeContainer'
import { UserContext } from '@/context/UserContext'
import ParkHeader from '@/components/ParkHeader'
import { fetchAttendeesAndDogs, checkIn, checkOut } from '@/utils/firebaseUtils'
import { useLoaderData, useParams } from 'react-router-dom'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '@/firebase'

const Park = () => {
  const { currentUser, userInfo, setUserInfo } = useContext(UserContext)
  const { parkId } = useParams()
  const parkDetails = useLoaderData()

  const [parkName, setParkName] = useState('')
  const [attendees, setAttendees] = useState([])

  useEffect(() => {
    const updateAttendees = async () => {
      const attendeeDocs = await fetchAttendeesAndDogs(parkId)
      setParkName(parkDetails.name)
      setAttendees(
        attendeeDocs.map((user) => {
          return {
            ...user,
          }
        })
      )
    }

    const unsub = onSnapshot(doc(db, 'parks', parkId), async (doc) => {
      await updateAttendees()
    })

    return () => {
      unsub()
    }
  }, [])

  const handleCheckIn = async () => {
    try {
      await checkIn(currentUser.uid, parkId)
      setAttendees((prevAttendees) => {
        return [
          ...prevAttendees,
          {
            owner: userInfo.name,
            dogs: userInfo.dogs,
            checkedInTime: new Date().getTime() / 1000,
          },
        ]
      })
      setUserInfo((prevUserInfo) => {
        return { ...prevUserInfo, checkedIn: true, park: parkId }
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleCheckOut = async () => {
    const filteredAttendees = attendees.filter(
      (attendee) => attendee.id !== currentUser.uid
    )
    try {
      await checkOut(currentUser.uid, userInfo.park)
      setUserInfo((prevUserInfo) => {
        return { ...prevUserInfo, checkedIn: false, park: '' }
      })
      setAttendees(filteredAttendees)
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
        onClick={userInfo.checkedIn ? handleCheckOut : handleCheckIn}
      >
        {userInfo.checkedIn ? 'Check out!' : 'Check in!'}
      </button>
    </>
  )
}
export default Park
