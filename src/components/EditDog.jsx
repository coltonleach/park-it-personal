import { useRef } from 'react'
import './styles/dogEdit.scss'

const EditDog = ({ id, setEditDog }) => {
  const dogNameRef = useRef()
  const dogAgeRef = useRef()
  // const dogImageRef = useRef()
  const dogBreedRef = useRef()
  const dogMaleRef = useRef()
  const dogFemaleRef = useRef()

  const handleSave = (e) => {
    e.preventDefault()
  }

  const handleCloseModal = (e) => {
    // e.stopPropagation()
    setEditDog(false)
  }

  return (
    <div className='modal'>
      <div className='edit-container'>
        <form>
          <input
            type='text'
            ref={dogNameRef}
            id='dog_name'
            placeholder={`what's their name?`}
          />
          <input
            type='number'
            ref={dogAgeRef}
            id='dog_age'
            placeholder={`what's their age?`}
            min='0'
            max='20'
          />
          <input
            type='text'
            ref={dogBreedRef}
            id='dog_breed'
            placeholder='breed'
          />
          <div>
            <input
              type='radio'
              name='dog_sex'
              ref={dogMaleRef}
              id='dog_male'
              value='Male'
              // style={{ display: 'none' }}
            />
            <label htmlFor='dog_male' className='btn'>
              Boy
            </label>
            <input
              type='radio'
              name='dog_sex'
              ref={dogFemaleRef}
              id='dog_female'
              value='Female'
              // style={{ display: 'none' }}
            />
            <label htmlFor='dog_female' className='btn'>
              Girl
            </label>
          </div>
        </form>
        <div className='btn-container'>
          <button className='btn-primary' onClick={(e) => handleSave(e)}>
            Save
          </button>
          <button className='btn-secondary' onClick={() => setEditDog(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
export default EditDog
