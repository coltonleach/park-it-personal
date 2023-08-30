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
  * Add contact form for suggestions.
  * Add functionality to automatically check someone out after 30 minutes of being checked in.
  * Allow user to edit their profile
  * Fix the issue where a user needs to refresh their browser whenever the finish the setup process.
*/
