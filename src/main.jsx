import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
)

/* 
  TODO:
  * Make it so that when a user signs up and hasn't put in their dog's info, force them back to that page so in order to use the app they have to finish their profile.
  * Add contact form for suggestions.
  * Add checkin/out functionality, as well as update Firestore.
  *   Updating Firestore is working, just have to update the frontend without refreshing and re-calling the DB.
  *   Check if the user has a user and dog doc in Firestore. If so, allow them to check in. If not, don't let them check in.
  * Add functionality to automatically check someone out after 30 minutes of being checked in.
  * Add bulletin board.
  *   Need to allow users to send a message
  * Add a notification system when a "liked" dog joins the park.
  *   Low priority
*/
