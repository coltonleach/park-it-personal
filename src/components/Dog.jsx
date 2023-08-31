import { FiEdit3 } from 'react-icons/fi'
import './styles/dog.scss'

const Dog = ({ dog, setEditDog }) => {
  return (
    <div className='dog-info'>
      <img src='' alt={dog.name} />
      <div>
        <p className='dog-name'>{dog.name}</p>
        {/* <p className='dog-breed'>{dog.breed}</p>
        <p className='dog-age'>{dog.age} years old</p>
        <p className='dog-sex'>{dog.sex}</p> */}
      </div>
      {/* <FiEdit3 size='1.75rem' onClick={() => setEditDog(true)} /> */}
    </div>
  )
}
export default Dog
