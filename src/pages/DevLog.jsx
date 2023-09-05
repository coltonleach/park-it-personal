import './styles/devlog.scss'

const DevLog = () => {
  return (
    <>
      <h1>9/5/23</h1>
      <div className='update-container'>
        <ul className='update-list'>
          <h2>Updates</h2>
          <li>
            Added auto checkout feature. Every 5 minutes, the server will check
            who's currently checked in. If any user is checked in for longer
            than 30 minutes, they will automatically be checked out.
          </li>
          <li>Added this page 😀</li>
          <li>Simplified the navigation bar.</li>
        </ul>
        <ul className='update-list'>
          <h2>Known bugs</h2>
          <li>
            When you get automatically checked out, the banner saying "you're
            currently checked in" will still be visible. If you refresh your
            browser, it will go away.
          </li>
        </ul>
        <ul className='update-list'>
          <h2>What's next</h2>
          <li>
            Have live updates for when someone joins the park. Currently, when
            someone checks into a park that you're looking at, you won't see
            their information there until you refresh the screen.
          </li>
          <li>Add a way to submit bug reports/feedback suggestions.</li>
          <li>Add the ability to edit both you and your dog's information.</li>
          <li>Allow users to add/remove dogs from their account.</li>
        </ul>
      </div>
    </>
  )
}
export default DevLog
