import './globals.scss'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom'
import { useContext } from 'react'
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

export const LoggedInProtectedRoute = ({ children }) => {
  const user = useContext(UserContext)

  if (!user) return <Navigate to='/login' />

  return (
    <>
      {children}
      <WithNav />
    </>
  )
}

export const LoggedOutProtectedRoute = ({ children }) => {
  const user = useContext(UserContext)

  if (user) return <Navigate to='/' />

  return (
    <>
      {children}
      <WithoutNav />
    </>
  )
}

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route element={<LoggedInProtectedRoute />}>
        <Route index element={<Home />} />
        <Route path='settings' element={<Settings />} />
        <Route path='setup' element={<Setup />} />
        <Route path='contact' element={<Bulletin />} />
        <Route path='setup' element={<Setup />} />
        <Route path='profile' element={<Profile />} />
        <Route path='/park/'>
          <Route path=':parkId' element={<Park />} loader={parkDetailsLoader} />
        </Route>
      </Route>
      <Route element={<LoggedOutProtectedRoute />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='recover' element={<Recover />} />
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
