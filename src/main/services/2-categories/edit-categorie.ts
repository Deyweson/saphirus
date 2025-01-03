import { ICategorie } from '../../../preload/models/ICategorie'
import { db } from '../database/db'

export async function EditCategorie(
  id: number,
  description: string
): Promise<{
  success: boolean
  message: string
}> {
  try {
    await db<ICategorie>('categories').update({ description }).where({ id })
    return {
      success: true,
      message: 'Categoria editada com sucesso'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao editar a categoria'
    }
  }
}
