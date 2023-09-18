import './styles/devlog.scss'

const DevLog = () => {
  return (
    <>
      <h1>9/17/23</h1>
      <div className='update-container'>
        <ul className='update-list'>
          <h2>Updates</h2>
          <li>
            You can now update a dog's information, as well as delete a dog
            (after confirmation).
          </li>
        </ul>
        <ul className='update-list'>
          <h2>Known bugs</h2>
          <li>
            Sometimes the "dog counter" on the parks from the home screen isn't
            accurate.
          </li>
        </ul>
        <ul className='update-list'>
          <h2>What's next</h2>
          <li>Add a way to submit bug reports/feedback suggestions.</li>
          <li>Allow users to upload a picture for their dog(s).</li>
          <li>
            Send notifications to users whenever a certain amount of dogs are at
            the park.
          </li>
        </ul>
      </div>
    </>
  )
}
export default DevLog
