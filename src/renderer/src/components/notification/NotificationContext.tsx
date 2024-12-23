import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Notification {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
}

interface NotificationContextType {
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void
  removeNotification: (id: string) => void
  notifications: Notification[]
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (message: string, type?: 'success' | 'error' | 'info'): void => {
    const newNotification: Notification = {
      id: uuidv4(),
      message,
      type
    }
    setNotifications((prevNotifications) => [...prevNotifications, newNotification])
  }

  const removeNotification = (id: string): void => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    )
  }

  useEffect(() => {
    const timers = notifications.map((notification) =>
      setTimeout(() => removeNotification(notification.id), 5000)
    )

    return (): void => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [notifications])

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification, notifications }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
