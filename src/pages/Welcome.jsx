import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <>
      <h1>Park It! - Private</h1>
      <div
        style={{
          margin: '0 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <p>Welcome to the exclusive dog park app! 🚀</p>
        <p>
          Think of this app as a closed beta - a time dedicated to learning and
          improving. This project has been an incredible learning process for
          me, and there is quite a bit that needs to be ironed out.
        </p>
        <p>
          User experience is a high priority of mine, and the only way I can
          improve it is from the honesty of you all! Please let me know of any
          problems, queries, recommendations, etc. either personally or through
          the "Contact me" section of the app.
        </p>
        <p>
          The first few weeks are likely going to be rough around the edges, I
          hope y'all are ok with that. Part of improving the user experience
          requires that users learn the platform on their own, because if I need
          to tell someone how to use the app in order for them to understand it,
          then I didn't do a good job with user experience.
        </p>
        <p>
          The goal for this app is to eventually turn it into a native mobile
          app, but that is significantly more work than a web app. If this app
          ends up being well received and people request for it, then I'm game
          to give it a shot.
        </p>
        <p>
          By the way, this project is entirely open source! If you would like to
          take a peak at the code, you can{' '}
          <a
            href='https://github.com/coltonleach/park-it-personal'
            target='_blank'
            rel='noreferrer'
            style={{ padding: '0' }}
          >
            click here to view the GitHub repo
          </a>
          . I typically add some extensive notes about the progress of each
          update, so feel free to read through my struggles.
        </p>
      </div>
      <div className='btn-container'>
        <Link className='btn-primary' to='/login'>
          Sign in
        </Link>
        <Link to='/register' className='btn-secondary'>
          Create an account
        </Link>
      </div>
      <Link to='/recover'>Forgot password?</Link>
    </>
  )
}
export default Welcome
