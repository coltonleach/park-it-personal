import UndrawSetup from '@/assets/UndrawSetup'
import DogForm from '@/components/DogForm'

const Setup = () => {
  return (
    <>
      <h1>Tell us about your dog!</h1>
      <UndrawSetup />
      <DogForm initialSetup={true} />
      {/* <div>
        <p>Do you like to add another dog?</p>
        <button className='btn-secondary'>Yes</button>
        <button className='btn-secondary' onClick={handleSubmit}>
          No
        </button>
      </div> */}
    </>
  )
}
export default Setup
