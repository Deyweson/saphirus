import logo from '@renderer/assets/logo.png'
import './style.css'
import { RegisterForm } from './register-form'
import { useState } from 'react'

export function LoginForm(): JSX.Element {
  const [registerModal, setRegisterModal] = useState<boolean>(true)

  return (
    <div className="login-form">
      <img src={logo} />
      <form>
        <input placeholder="Usuário" type="text" />
        <input placeholder="Senha" type="password" />
        <button>Login</button>
      </form>
      <RegisterForm isOpen={registerModal} close={setRegisterModal} />
    </div>
  )
}
