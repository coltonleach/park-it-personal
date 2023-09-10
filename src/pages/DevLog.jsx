import './styles/devlog.scss'

const DevLog = () => {
  return (
    <>
      <h1>9/10/23</h1>
      <div className='update-container'>
        <ul className='update-list'>
          <h2>Updates</h2>
          <li>
            Added the option to add an additional dog when viewing your own
            profile.
          </li>
          <li>
            Added live updates for when someone joins the park. Now if you're
            looking at a park and someone checks in, you should see it
            immediately.
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
          <li>Allow users to remove dogs from their account.</li>
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
