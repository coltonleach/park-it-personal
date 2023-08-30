import { useState, createContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'
import { fetchUser, fetchOwnersDogs } from '@/utils/firebaseUtils'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      const userSnapshot = await fetchUser(user.uid)
      if (userSnapshot.data().completed) {
        const dogsSnapshot = await fetchOwnersDogs(userSnapshot)
        setUserInfo({
          ...userSnapshot.data(),
          dogs: dogsSnapshot,
          id: user.uid,
          checkedIn: userSnapshot.data().park ? true : false,
          park: userSnapshot.data().park?.id,
        })
      }
      setIsLoading(false)
    })

    return () => {
      unsub()
    }
  }, [])

  return (
    <UserContext.Provider
      value={{ currentUser, userInfo, setUserInfo, isLoading }}
    >
      {children}
    </UserContext.Provider>
  )
}
