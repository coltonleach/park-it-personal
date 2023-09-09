import { useContext, useEffect, useState } from 'react'
import { fetchPark } from '@/utils/firebaseUtils'
import ParkOption from '@/components/ParkOption'
import { UserContext } from '@/context/UserContext'
import HomeHeader from '@/components/HomeHeader'
import { onSnapshot, query, collection } from 'firebase/firestore'
import { db } from '@/firebase'

const Home = () => {
  const { userInfo } = useContext(UserContext)
  const [parks, setParks] = useState([])
  const [checkedInPark, setCheckedInPark] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'parks'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      const parksInfo = []
      querySnapshot.forEach((doc) => {
        parksInfo.push({
          name: doc.data().name,
          id: doc.id,
          attendeeCount: doc.data().attendees.length,
        })
      })

      if (userInfo.park) {
        const filteredPark = parksInfo.find((park) => park.id === userInfo.park)
        setCheckedInPark(filteredPark.name)
      }

      setParks(parksInfo)
    })

    return () => {
      unsub()
    }
  }, [userInfo])

  return (
    <>
      <HomeHeader checkedInPark={checkedInPark} />
      {parks.map((park) => (
        <ParkOption key={park.id} park={park} />
      ))}
    </>
  )
}
export default Home

export const parkDetailsLoader = async ({ params }) => {
  const { parkId } = params

  const parkInfo = await fetchPark(parkId)

  return { ...parkInfo }
}
