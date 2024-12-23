import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import LoginSettings from './pages/login-settings'
import Home from './pages/home'

export function MainRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login-settings" element={<LoginSettings />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}
