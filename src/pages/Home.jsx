import { useContext, useEffect, useState } from 'react'
import { fetchParks, fetchPark } from '@/utils/utils'
import ParkOption from '@/components/ParkOption'
import { UserContext } from '@/context/UserContext'
import HomeHeader from '../components/HomeHeader'

const Home = () => {
  const { userInfo } = useContext(UserContext)
  const [parks, setParks] = useState([])
  const [checkedInPark, setCheckedInPark] = useState(null)

  useEffect(() => {
    const updateParks = async () => {
      const parksInfo = await fetchParks()
      setParks(parksInfo)
      if (userInfo.park) {
        const filteredPark = parksInfo.find((park) => park.id === userInfo.park)
        setCheckedInPark(filteredPark.name)
      }
    }
    updateParks()
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
