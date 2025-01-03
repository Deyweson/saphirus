import { ipcMain } from 'electron'
import { IUser } from '../../../preload/models/IUser'
import { Login } from '../1-login/login'
import { Register } from './register'
import { CheckUsers } from './check-user'

export function LoginScreen(): void {
  ipcMain.handle('login', async (__event, user: IUser) => {
    return await Login(user.username, user.password)
  })

  ipcMain.handle('check-users', async () => {
    return await CheckUsers()
  })

  ipcMain.handle('register', async (__event, user: IUser) => {
    return await Register(user.username, user.password)
  })
}
