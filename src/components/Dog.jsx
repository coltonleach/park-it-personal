import { FiEdit3, FiTrash2 } from 'react-icons/fi'
import './styles/dog.scss'

const Dog = ({ dog, handleEditDog, handleDeleteDog }) => {
  return (
    <div className='dog-info'>
      <img src='' alt={dog.name} />
      <div>
        <p className='dog-name'>{dog.name}</p>
        <p className='dog-breed'>{dog.breed}</p>
        <p className='dog-age'>{dog.age} years old</p>
        <p className='dog-sex'>{dog.sex}</p>
      </div>
      <div className='dog-btn-container'>
        <FiEdit3 size='1.75rem' onClick={() => handleEditDog(dog)} />
        <FiTrash2 size='1.75rem' onClick={() => handleDeleteDog(dog)} />
      </div>
    </div>
  )
}
export default Dog
