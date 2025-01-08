import { UserModel } from '../../database-models/UserModel'
import { db } from '../database/db'

export async function CheckUsers(): Promise<{
  success: boolean
  data: number | null
  message: string
}> {
  try {
    const countResult = await db<UserModel>('users').count<{ count: number }>('* as count')
    const count = countResult[0].count
    console.log(count)
    return {
      success: true,
      data: count,
      message: 'Não tem usuários cadastrados'
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      data: null,
      message: 'Erro ao realizar o login'
    }
  }
}
