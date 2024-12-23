import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { MainRoutes } from './routes'
import { NotificationProvider } from './components/notification/NotificationContext'
import NotificationList from './components/notification/NotificationList'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <NotificationProvider>
    <React.StrictMode>
      <HashRouter>
        <MainRoutes />
        <NotificationList />
      </HashRouter>
    </React.StrictMode>
  </NotificationProvider>
)
