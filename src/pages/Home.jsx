import { useEffect, useState } from 'react'
import { fetchParks, fetchPark } from '@/utils/utils'
import ParkOption from '@/components/ParkOption'

const Home = () => {
  const [parks, setParks] = useState([])

  useEffect(() => {
    const updateParks = async () => {
      const parksInfo = await fetchParks()
      setParks(parksInfo)
    }
    updateParks()
  }, [])

  return (
    <>
      <h1>Select A Park</h1>
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
