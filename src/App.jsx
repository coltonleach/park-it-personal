import './globals.scss'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '@/context/UserContext'

//Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Home, { parkDetailsLoader } from './pages/Home'
import Settings from './pages/Settings'
import Setup from './pages/Setup'
import Profile from './pages/Profile'
import Park from './pages/Park'
import Contact from './pages/Contact'
import Bulletin from './pages/Bulletin'
import Recover from './pages/Recover'

//Layout
import WithNav from './layouts/WithNav'
import WithoutNav from './layouts/WithoutNav'
import SetupLayout from './layouts/SetupLayout'

export const LoggedInProtectedRoute = ({ children }) => {
  const { currentUser, userInfo, isLoading } = useContext(UserContext)

  if (!currentUser) return <Navigate to='/login' />
  if (!isLoading && !userInfo.completed) return <Navigate to='/setup' />

  return (
    <>
      {children}
      <WithNav />
    </>
  )
}

export const LoggedOutProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext)

  if (currentUser) return <Navigate to='/' />

  return (
    <>
      {children}
      <WithoutNav />
    </>
  )
}

export const AccountSetupProtectedRoute = ({ children }) => {
  const { currentUser, userInfo } = useContext(UserContext)

  if (!currentUser) return <Navigate to='/login' />
  if (userInfo.completed) return <Navigate to='/' />

  return (
    <>
      {children}
      <SetupLayout />
    </>
  )
}

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route element={<LoggedInProtectedRoute />}>
        <Route index element={<Home />} />
        <Route path='settings' element={<Settings />} />
        <Route path='contact' element={<Bulletin />} />
        <Route path='profile' element={<Profile />} />
        <Route path='/park/'>
          <Route path=':parkId' element={<Park />} loader={parkDetailsLoader} />
        </Route>
        {/* <Route path='setup' element={<Setup />} /> */}
      </Route>
      <Route element={<LoggedOutProtectedRoute />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='recover' element={<Recover />} />
      </Route>
      <Route element={<AccountSetupProtectedRoute />}>
        <Route path='setup' element={<Setup />} />
      </Route>
    </Route>
  )
)

const App = () => {
  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  )
}
export default App
