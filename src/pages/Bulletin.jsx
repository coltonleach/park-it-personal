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
    await addBulletinMessage(userInfo.id, message)
  }

  return (
    <>
      <h1>Bulletin Board</h1>
      <BulletinMessages messages={messages} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea ref={messageRef} style={{ width: '80vw' }} />
        <button className='btn-primary'>Submit</button>
      </form>
    </>
  )
}
export default Bulletin
