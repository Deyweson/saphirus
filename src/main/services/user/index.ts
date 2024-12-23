import { ipcMain } from 'electron'
import { IUser } from '../../../preload/models/IUser'
import bcrypt from 'bcrypt'
import { db } from '../database/db'

export function user(): void {
  ipcMain.handle('login', async (__event, user: IUser) => {
    try {
      const userValidator = await db('users')
        .select('*')
        .where('username', user.username.toLowerCase())
        .first()
      if (!userValidator) {
        return {
          success: false,
          message: 'Credenciais inválidas'
        }
      }

      const passwordCompare = await bcrypt.compare(user.password, userValidator.password)
      if (!passwordCompare) {
        return {
          success: false,
          message: 'Credenciais inválidas'
        }
      }

      return {
        success: true,
        message: 'Login efetuado com sucesso'
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        message: 'Erro ao realizar o login'
      }
    }
  })

  ipcMain.handle('register', async (__event, user: IUser) => {
    try {
      const usernameValidator = await db('users')
        .select('*')
        .where('username', user.username)
        .first()
      if (usernameValidator) {
        return {
          success: false,
          message: 'Nome de usuário já esta em uso'
        }
      }

      const hashedPassword = await bcrypt.hash(user.password, 10)

      await db('users').insert({ username: user.username.toLowerCase(), password: hashedPassword })

      return {
        success: true,
        message: 'Usuário registrado com sucesso'
      }
    } catch (err) {
      return {
        success: false,
        message: 'Erro ao registrar o novo usuário'
      }
    }
  })
}
