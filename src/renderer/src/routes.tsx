import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/login'

export function MainRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  )
}
