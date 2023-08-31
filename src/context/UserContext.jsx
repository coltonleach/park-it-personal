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
    })

    const fetchDetails = async () => {
      if (currentUser && currentUser.uid) {
        const userSnapshot = await fetchUser(currentUser.uid)
        if (userSnapshot.data().completed) {
          const dogsInfo = await fetchOwnersDogs(userSnapshot)
          setUserInfo({
            ...userSnapshot.data(),
            dogs: dogsInfo,
            id: currentUser.uid,
            checkedIn: userSnapshot.data().park ? true : false,
            park: userSnapshot.data().park?.id,
          })
        } else {
          setUserInfo({
            name: userSnapshot.data().name,
            id: currentUser.uid,
          })
        }
        setIsLoading(false)
      }
    }

    fetchDetails()
    return () => {
      setUserInfo({})
      unsub()
    }
  }, [currentUser])

  return (
    <UserContext.Provider
      value={{ currentUser, userInfo, setUserInfo, isLoading }}
    >
      {children}
    </UserContext.Provider>
  )
}
