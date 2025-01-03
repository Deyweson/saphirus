import { ICategorie } from '../../../preload/models/ICategorie'
import { db } from '../database/db'

export async function DeleteCategorie(id: number): Promise<{
  success: boolean
  message: string
}> {
  try {
    await db<ICategorie>('categories').delete().where({ id })
    return {
      success: true,
      message: 'Categoria deletada com sucesso'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao deletar a categoria'
    }
  }
}
