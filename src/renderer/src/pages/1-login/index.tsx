import React, { useEffect, useState } from 'react'
import LoginForm from './login-form'
import RegisterModal from './register-modal'
import { useNotification } from '@renderer/components/notification/NotificationContext'

const Login: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false)
  const { addNotification } = useNotification()

  const checkUsers = async (): Promise<void> => {
    const response = await window.LoginScreen.checkUsers()
    if (response.success && response.data != null && response.data <= 0) {
      setModal(true)
      addNotification(response.message, 'info')
      return
    }
    if (!response.success) {
      addNotification(response.message, 'success')
      return
    }
  }

  useEffect(() => {
    checkUsers()
  }, [])

  return (
    <>
      <LoginForm />
      <RegisterModal onClose={setModal} open={modal} />
    </>
  )
}

export default Login
