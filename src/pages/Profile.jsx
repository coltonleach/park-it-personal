const Profile = () => {
  const handleSignOut = () => {
    console.log('sign out')
  }
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>My Profile</h1>
        <img src='' alt='avatar' />
        <p>Edit Profile</p>
      </div>
      <ul>
        {/* <li>Dog Parks</li> */}
        <li>Your dogs</li>
        <li>Liked dogs</li>
        <li>Disliked dogs</li>
      </ul>
      <button className='btn-secondary' onClick={handleSignOut}>
        Sign Out
      </button>
    </>
  )
}
export default Profile
