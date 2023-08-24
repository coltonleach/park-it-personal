import UndrawSetup from '@/assets/UndrawSetup'
import { useContext, useRef } from 'react'
import { UserContext } from '@/context/UserContext'
import { addUser, addDog } from '@/utils/utils'
import { useNavigate } from 'react-router-dom'

const Setup = () => {
  const user = useContext(UserContext)
  const navigator = useNavigate()

  const dogNameRef = useRef()
  const dogAgeRef = useRef()
  const dogImageRef = useRef()
  const dogBreedRef = useRef()
  const dogMaleRef = useRef()
  const dogFemaleRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dogName = dogNameRef.current.value
    const dogAge = Number(dogAgeRef.current.value)
    const dogImage = dogImageRef.current.value
    const dogBreed = dogBreedRef.current.value
    const dogMale = dogMaleRef.current
    const dogFemale = dogFemaleRef.current
    const dogSex = dogMale.checked
      ? dogMale.value
      : dogFemale.checked
      ? dogFemale.value
      : ''

    console.log(dogMale.checked, dogFemale.checked, dogSex)

    try {
      const dogRef = await addDog(dogAge, dogBreed, dogName, dogSex)
      await addUser(user.displayName, [dogRef], user.uid)
      navigator('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ overflowY: 'scroll', textAlign: 'center' }}>
      <h1>Welcome to Park It!</h1>
      <UndrawSetup />
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>Tell us about your dog!</p>
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
          type='file'
          ref={dogImageRef}
          id='dog_image'
          accept='image/png, image/jpeg'
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
          />
          <label htmlFor='dog_male'>Boy</label>
          <input
            type='radio'
            name='dog_sex'
            ref={dogFemaleRef}
            id='dog_female'
            value='Female'
          />
          <label htmlFor='dog_female'>Girl</label>
        </div>
        <button>Complete Setup 😁</button>
      </form>
      {/* <div>
        <p>Do you like to add another dog?</p>
        <button className='btn-secondary'>Yes</button>
        <button className='btn-secondary' onClick={handleSubmit}>
          No
        </button>
      </div> */}
    </div>
  )
}
export default Setup
