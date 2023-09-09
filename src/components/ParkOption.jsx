import './styles/park.scss'
import { BsChevronRight } from 'react-icons/bs'
import { PiDog } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

const ParkOption = ({ park }) => {
  const navigator = useNavigate()

  return (
    <div className='park-info' onClick={() => navigator(`/park/${park.id}`)}>
      <div>
        <h2>{park.name}</h2>
        <div className='dog-counter'>
          <PiDog size='1.5rem' />
          <p>{park.attendeeCount}</p>
        </div>
      </div>
      <BsChevronRight size='2rem' />
    </div>
  )
}
export default ParkOption
