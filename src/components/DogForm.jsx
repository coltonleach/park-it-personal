import { useRef, useContext } from 'react'
import {
  addDog,
  completeUser,
  addAnotherDog,
  updateDog,
} from '@/utils/firebaseUtils'
import { UserContext } from '@/context/UserContext'
import { useNavigate } from 'react-router-dom'

const DogForm = ({ initialSetup, selectedDog }) => {
  const { currentUser, setUserInfo } = useContext(UserContext)
  const navigator = useNavigate()

  const dogNameRef = useRef()
  const dogAgeRef = useRef()
  // const dogImageRef = useRef()
  const dogBreedRef = useRef()
  const dogMaleRef = useRef()
  const dogFemaleRef = useRef()

  let selectedDogMale = false,
    selectedDogFemale = false

  selectedDog?.sex == 'Male'
    ? (selectedDogMale = true)
    : selectedDog?.sex == 'Female'
    ? (selectedDogFemale = true)
    : null

  const handleCompleteUser = async (e) => {
    e.preventDefault()

    const dogName = dogNameRef.current.value
    const dogAge = Number(dogAgeRef.current.value)
    // const dogImage = dogImageRef.current.value
    const dogBreed = dogBreedRef.current.value
    const dogMale = dogMaleRef.current
    const dogFemale = dogFemaleRef.current
    const dogSex = dogMale.checked
      ? dogMale.value
      : dogFemale.checked
      ? dogFemale.value
      : ''

    try {
      if (selectedDog?.id) {
        await updateDog(
          selectedDog.id,
          dogName == '' ? selectedDog?.name : dogName,
          dogAge == '' ? selectedDog?.age : dogAge,
          dogBreed == '' ? selectedDog?.breed : dogBreed,
          dogSex == '' ? selectedDog?.sex : dogSex
        )
      } else {
        const dogRef = await addDog(dogAge, dogBreed, dogName, dogSex)
        if (initialSetup) {
          await completeUser(currentUser.displayName, [dogRef], currentUser.uid)
          setUserInfo((prevUserInfo) => {
            return {
              ...prevUserInfo,
              dogs: [
                ...prevUserInfo.dogs,
                {
                  age: dogAge,
                  breed: dogBreed,
                  name: dogName,
                  sex: dogSex,
                },
              ],
              completed: true,
            }
          })
        } else {
          await addAnotherDog(dogRef, currentUser.uid)
        }
      }
    } catch (err) {
      console.error(err)
    }
    navigator('/')
  }

  return (
    <form onSubmit={(e) => handleCompleteUser(e)}>
      <input
        type='text'
        ref={dogNameRef}
        id='dog_name'
        placeholder={selectedDog?.id ? selectedDog.name : `what's their name?`}
        required={selectedDog?.id ? false : true}
      />
      <input
        type='number'
        ref={dogAgeRef}
        id='dog_age'
        placeholder={selectedDog?.id ? selectedDog.age : `age?`}
        min='0'
        max='20'
      />
      {/* <input
    type='file'
    ref={dogImageRef}
    id='dog_image'
    accept='image/png, image/jpeg'
  /> */}
      <input
        type='text'
        ref={dogBreedRef}
        id='dog_breed'
        placeholder={selectedDog?.id ? selectedDog.breed : `breed?`}
        required={selectedDog?.id ? false : true}
      />
      <div>
        <input
          type='radio'
          name='dog_sex'
          ref={dogMaleRef}
          id='dog_male'
          value='Male'
          style={{ display: 'none' }}
          defaultChecked={selectedDogMale}
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
          style={{ display: 'none' }}
          defaultChecked={selectedDogFemale}
        />
        <label htmlFor='dog_female' className='btn'>
          Girl
        </label>
      </div>
      <div>
        <button className='btn-primary'>
          {initialSetup ? 'Complete Setup 😁' : 'Submit'}
        </button>
        {/* {!initialSetup ? <button className='btn-secondary'>Back</button> : null} */}
      </div>
    </form>
  )
}
export default DogForm
