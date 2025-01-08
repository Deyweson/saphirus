import { Route, Routes } from 'react-router-dom'

export function MainRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello</h1>} />
    </Routes>
  )
}
