import { useEffect, useState, useContext, useRef } from 'react'
import {
  fetchBulletinMessages,
  addBulletinMessage,
} from '@/utils/firebaseUtils'
import BulletinMessages from '@/components/BulletinMessages'
import { UserContext } from '@/context/UserContext'

const Bulletin = () => {
  const { userInfo } = useContext(UserContext)
  const [messages, setMessages] = useState([])

  const messageRef = useRef(null)

  useEffect(() => {
    const fetchMessages = async () => {
      const bulletinMessages = await fetchBulletinMessages()
      setMessages(bulletinMessages)
    }

    fetchMessages()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = messageRef.current.value

    if (message.length > 0) {
      await addBulletinMessage(userInfo.id, message)
      setMessages((prevMessages) => {
        return [
          {
            user: { name: userInfo.name },
            message,
          },
          ...prevMessages,
        ]
      })
      messageRef.current.value = ''
    }
  }

  return (
    <>
      <h1>Bulletin Board</h1>
      <BulletinMessages messages={messages} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          ref={messageRef}
          placeholder={`What's on your mind?`}
          style={{
            width: '80vw',
            height: '10ch',
            borderRadius: '1rem',
            border: '2px solid var(--clr-black)',
            fontFamily: 'var(--font-family)',
            padding: '0.35rem 0.75em',
            resize: 'none',
          }}
        />
        <button className='btn-primary'>Submit</button>
      </form>
    </>
  )
}
export default Bulletin
