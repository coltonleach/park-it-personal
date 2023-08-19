import './globals.scss'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

//Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Home, { parkDetailsLoader } from './pages/Home'
import Settings from './pages/Settings'
import Setup from './pages/Setup'
import Profile from './pages/Profile'
import Park from './pages/Park'
import Contact from './pages/Contact'

//Layout
import WithNav from './layouts/WithNav'
import WithoutNav from './layouts/WithoutNav'

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route element={<WithNav />}>
        <Route index element={<Home />} />
        <Route path='settings' element={<Settings />} />
        <Route path='contact' element={<Contact />} />
        <Route path='setup' element={<Setup />} />
        <Route path='profile' element={<Profile />} />
        <Route path='/park/'>
          <Route path=':parkId' element={<Park />} loader={parkDetailsLoader} />
        </Route>
      </Route>
      <Route element={<WithoutNav />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
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
