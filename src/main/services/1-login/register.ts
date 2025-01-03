import { db } from '../database/db'
import bcrypt from 'bcrypt'

export async function Register(
  username: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  try {
    const usernameValidator = await db('users').select('*').where('username', username).first()
    if (usernameValidator) {
      return {
        success: false,
        message: 'Nome de usuário já esta em uso'
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db('users').insert({ username: username.toLowerCase(), password: hashedPassword })

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
}
