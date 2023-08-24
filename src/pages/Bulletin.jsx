import { useEffect, useState } from 'react'
import { fetchBulletinMessages } from '@/utils/utils'
import BulletinMessages from '../components/BulletinMessages'

const Bulletin = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchMessages = async () => {
      const bulletinMessages = await fetchBulletinMessages()
      setMessages(bulletinMessages)
    }

    fetchMessages()
  }, [])

  return (
    <>
      <h1>Bulletin</h1>
      <BulletinMessages messages={messages} />
    </>
  )
}
export default Bulletin
