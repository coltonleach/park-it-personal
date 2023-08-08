import { useState, createContext } from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: 121221,
    owner: 'Colton Leach',
    pets: [
      {
        id: 1,
        name: 'Maxine',
        breed: 'Terrior Mixed',
        Age: 6,
      },
      {
        id: 2,
        name: 'Star',
        breed: 'Wiener Dog',
        age: 1,
      },
    ],
    atPark: false,
  })

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}
