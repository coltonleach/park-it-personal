import UndrawSetup from '../assets/UndrawSetup'

const Setup = () => {
  const handleSubmit = () => {
    console.log('submit')
  }
  return (
    <>
      <h1>Welcome to Park It!</h1>
      <UndrawSetup />
      <form>
        <p>Tell us about your dog!</p>
        <input
          type='text'
          name='dog_name'
          id='dog_name'
          placeholder={`what's their name?`}
        />
        <input
          type='number'
          name='dog_age'
          id='dog_age'
          placeholder={`what's their age?`}
          min='0'
          max='20'
        />
        <input
          type='file'
          name='dog_image'
          id='dog_image'
          accept='image/png, image/jpeg'
        />
        <input
          type='text'
          name='dog_breed'
          id='dog_breed'
          placeholder='breed'
        />
        <div>
          <input type='radio' name='dog_sex' id='dog_male' />
          <label htmlFor='dog_male'>Boy</label>
          <input type='radio' name='dog_sex' id='dog_female' />
          <label htmlFor='dog_female'>Girl</label>
        </div>
      </form>
      <div>
        <p>Do you like to add another dog?</p>
        <button className='btn-secondary'>Yes</button>
        <button className='btn-secondary' onClick={handleSubmit}>
          No
        </button>
      </div>
    </>
  )
}
export default Setup
