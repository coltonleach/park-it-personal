import './globals.scss'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Setup from './pages/Setup'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/setup' element={<Setup />} />
      </Routes>
      <Navbar />
    </>
  )
}
export default App
