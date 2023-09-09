import { useState, createContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/firebase'
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

    let firestoreUnsub

    if (currentUser && currentUser.uid) {
      firestoreUnsub = onSnapshot(
        doc(db, 'users', currentUser.uid),
        async (userSnapshot) => {
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
      )
    }

    return () => {
      setUserInfo({})
      unsub()
      if (firestoreUnsub) firestoreUnsub()
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
