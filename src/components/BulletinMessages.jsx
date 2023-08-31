import './styles/bulletinMessage.scss'
import BulletinMessage from './BulletinMessage'

const BulletinMessages = ({ messages }) => {
  return (
    <>
      <div className='messages-container'>
        {messages.map((message) => {
          const date = message?.createdTime?.toDate() || new Date()
          return (
            <BulletinMessage
              key={message.createdTime}
              message={message}
              date={date}
            />
          )
        })}
      </div>
    </>
  )
}
export default BulletinMessages
