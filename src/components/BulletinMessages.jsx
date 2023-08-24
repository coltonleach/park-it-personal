import './styles/bulletinMessage.scss'

const BulletinMessages = ({ messages }) => {
  return (
    <>
      <div className='messages'>
        {messages.map((message) => {
          const date = message.createdTime.toDate()
          return (
            <div key={message.createdTime} className='message-container'>
              <p className='message-author'>{message.user.name}</p>
              <p className='message-date'>{`${
                date.getMonth() + 1
              }/${date.getDate()}/${date.getFullYear()}`}</p>
              <p className='message-body'>{message.message}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default BulletinMessages
