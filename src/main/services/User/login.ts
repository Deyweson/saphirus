import { db } from '../database/db'
import bcrypt from 'bcrypt'

export async function Login(
  username: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  try {
    const userValidator = await db('users')
      .select('*')
      .where('username', username.toLowerCase())
      .first()
    if (!userValidator) {
      return {
        success: false,
        message: 'Credenciais inválidas'
      }
    }

    const passwordCompare = await bcrypt.compare(password, userValidator.password)
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
}
