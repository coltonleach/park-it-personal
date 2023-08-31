import { useRef } from 'react'

const DogForm = () => {
  const dogNameRef = useRef()
  const dogAgeRef = useRef()
  // const dogImageRef = useRef()
  const dogBreedRef = useRef()
  const dogMaleRef = useRef()
  const dogFemaleRef = useRef()

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
      {/* <input
    type='file'
    ref={dogImageRef}
    id='dog_image'
    accept='image/png, image/jpeg'
  /> */}
      <input type='text' ref={dogBreedRef} id='dog_breed' placeholder='breed' />
      <div>
        <input
          type='radio'
          name='dog_sex'
          ref={dogMaleRef}
          id='dog_male'
          value='Male'
          style={{ display: 'none' }}
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
        />
        <label htmlFor='dog_female' className='btn'>
          Girl
        </label>
      </div>
      <button className='btn-primary'>Complete Setup 😁</button>
    </form>
  )
}
export default DogForm
