import './styles/park.scss'
import { BsChevronRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const ParkOption = ({ park }) => {
  const navigator = useNavigate()

  return (
    <div className='park-info' onClick={() => navigator(`/park/${park.id}`)}>
      <h2>{park.name}</h2>
      <BsChevronRight size='2rem' />
    </div>
  )
}
export default ParkOption
