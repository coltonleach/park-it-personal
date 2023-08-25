import { useState, createContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'
import { fetchUser, fetchOwnersDogs } from '@/utils/utils'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      const userInfo = await fetchUser(user.uid)
      const dogsInfo = await fetchOwnersDogs(userInfo)
      setUserInfo({
        ...userInfo.data(),
        dogs: dogsInfo,
        id: user.uid,
        checkedIn: userInfo.data().park ? true : false,
        park: userInfo.data().park.id,
      })
    })

    return () => {
      unsub()
    }
  }, [])

  return (
    <UserContext.Provider value={{ currentUser, userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}
