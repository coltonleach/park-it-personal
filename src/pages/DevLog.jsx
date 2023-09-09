import './styles/devlog.scss'

const DevLog = () => {
  return (
    <>
      <h1>9/9/23</h1>
      <div className='update-container'>
        <ul className='update-list'>
          <h2>Updates</h2>
          <li>
            Added live updates for when someone joins the park. Now if you're
            looking at a park and someone checks in, you should see it
            immediately.
          </li>
          <li>
            Added a "dog counter" to the parks on the home page that is also in
            real time.
          </li>
          <li>
            Fixed the "you're currently checked in" bug whenever a user would be
            automatically checked out.
          </li>
        </ul>
        <ul className='update-list'>
          <h2>Known bugs</h2>
          <li>None at the moment, but I'm sure this will change soon 😄</li>
        </ul>
        <ul className='update-list'>
          <h2>What's next</h2>
          <li>Add a way to submit bug reports/feedback suggestions.</li>
          <li>Add the ability to edit both you and your dog's information.</li>
          <li>Allow users to add/remove dogs from their account.</li>
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
