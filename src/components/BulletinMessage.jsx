const BulletinMessage = ({ message, date }) => {
  return (
    <div className='message-container'>
      <p className='message-author'>{message.user.name}</p>
      <p className='message-date'>{`${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`}</p>
      <p className='message-body'>{message.message}</p>
    </div>
  )
}
export default BulletinMessage
